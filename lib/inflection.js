const inflection = {}
module.exports = inflection

/**
 * List of nouns that use the same form for both singular and plural.
 * @type {Array.<string>}
 */
inflection.UNCOUNTABLE_WORDS = [
	'equipment',
	'information',
	'rice',
	'money',
	'species',
	'series',
	'fish',
	'sheep',
	'moose',
	'deer',
	'news'
];

/**
 * Translation rules
 * @enum {Array.<[RegExp, string]>}
 */
inflection.Rules = {
	SINGULAR_TO_PLURAL: [
		[ /(m)an$/gi, '$1en' ],
		[ /(pe)rson$/gi, '$1ople' ],
		[ /(child)$/gi, '$1ren' ],
		[ /^(ox)$/gi, '$1en' ],
		[ /(ax|test)is$/gi, '$1es' ],
		[ /(octop|vir)us$/gi, '$1i' ],
		[ /(alias|status)$/gi, '$1es' ],
		[ /(bu)s$/gi, '$1ses' ],
		[ /(buffal|tomat|potat)o$/gi, '$1oes' ],
		[ /([ti])um$/gi, '$1a' ],
		[ /sis$/gi, 'ses' ],
		[ /(?:([^f])fe|([lr])f)$/gi, '$1$2ves' ],
		[ /(hive)$/gi, '$1s' ],
		[ /([^aeiouy]|qu)y$/gi, '$1ies' ],
		[ /(x|ch|ss|sh)$/gi, '$1es' ],
		[ /(matr|vert|ind)ix|ex$/gi, '$1ices' ],
		[ /(m|l)ouse$/gi, '$1ice' ],
		[ /(quiz)$/gi, '$1zes' ],
		[ /s$/gi, 's' ],
		[ /$/g, 's' ]
	],

	PLURAL_TO_SINGULAR: [
		[ /(m)en$/gi, '$1an' ],
		[ /(pe)ople$/gi, '$1rson' ],
		[ /(child)ren$/gi, '$1' ],
		[ /([ti])a$/gi, '$1um' ],
		[ /((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/gi, '$2sis' ],
		[ /(hive)s$/gi, '$1' ],
		[ /(tive)s$/gi, '$1' ],
		[ /(curve)s$/gi, '$1' ],
		[ /([lr])ves$/gi, '$1f' ],
		[ /([^fo])ves$/gi, '$1fe' ],
		[ /([^aeiouy]|qu)ies$/gi, '$1y' ],
		[ /(s)eries$/gi, '$1eries' ],
		[ /(m)ovies$/gi, '$1ovie' ],
		[ /(x|ch|ss|sh)es$/gi, '$1' ],
		[ /(m|l)ice$/gi, '$1ouse' ],
		[ /(bus)es$/gi, '$1' ],
		[ /(o)es$/gi, '$1' ],
		[ /(shoe)s$/gi, '$1' ],
		[ /(cris|ax|test)es$/gi, '$1is' ],
		[ /(octop|vir)i$/gi, '$1us' ],
		[ /(alias|status)es$/gi, '$1' ],
		[ /^(ox)en/gi, '$1' ],
		[ /(vert|ind)ices$/gi, '$1ex' ],
		[ /(matr)ices$/gi, '$1ix' ],
		[ /(quiz)zes$/gi, '$1' ],
		[ /s$/gi, '' ]
	]
};

/**
 * List of words that are not to be capitalized for title case
 * @type {Array.<string>}
 */
inflection.TITLE_LOWERCASE_WORDS = [
	'and', 'or', 'nor', 'a', 'an', 'the', 'so', 'but', 'to', 'of', 'at', 'by',
	'from', 'into', 'on', 'onto', 'off', 'out', 'in', 'over', 'with', 'for'
];

/**
 * Regular expressions used for conversions
 * @enum {RegExp}
 */
inflection.CommonRegExp = {
	ID_SUFFIX: /(_ids|_id)$/g,
    UNDERSCORES: /_+/g,
    UNDERSCORES_OR_DASHES: /[-_]/g,
	NUMBERS: /(^|\s)\d+/g,
	SPACES: /\s+/g,
	SPACES_OR_UNDERSCORES: /[\s_]+/g,
	UPPERCASE: /[A-Z]/g,
	UNDERSCORE_PREFIX: /^_/
};

/**
 * General function that applies replacement rules to a string
 * @private
 * @param {string} str The string on which to preform the replacements
 * @param {Array.<[RegExp, string]>} rules List of rules to apply
 * @param {Array.<string>} skip Sub-strings to skip if they match
 * @return {string}
 */
inflection.applyRules_ = function (str, rules, skip) {
	var ignore = (skip.indexOf(str.toLowerCase()) !== -1);
	if (!ignore) {
		for (var i = 0, ii = rules.length; i < ii; ++i) {
			var rule = rules[i];
			if (rule[0].test(str)) {
				rule[0].lastIndex = 0;
				return str.replace(rule[0], rule[1]);
			} else {
				rule[0].lastIndex = 0;
			}
		}
	}
	return str;
};

/**
 * Returns the plural form of the word
 * @param {string} str The word of which to get a plural form
 * @return {string}
 */
inflection.toPlural = function (str) {
	return inflection.applyRules_(
		str,
		inflection.Rules.SINGULAR_TO_PLURAL,
		inflection.UNCOUNTABLE_WORDS
	);
};

/**
 * Returns the singular form of the word
 * @param {string} str The word of which to get a singular form
 * @return {string}
 */
inflection.toSingular = function (str) {
	return inflection.applyRules_(
		str,
		inflection.Rules.PLURAL_TO_SINGULAR,
		inflection.UNCOUNTABLE_WORDS
	);
};

/**
 * Returns a camel-cased (e.g. thisIsCamel) form of the string
 * @param {string} str The string of which to get the camel-cased form
 * @param {boolean=} upper Whether to return the "upper" camel-cased form
 *   also known as Pascal-case
 * @return {string}
 */
inflection.toCamelCase = function (str, upper) {
	str = str.toLowerCase();
	var parts = str.split(inflection.CommonRegExp.SPACES_OR_UNDERSCORES);
	for (var i = upper ? 0 : 1, ii = parts.length; i < ii; ++i) {
		var part = parts[i];
		parts[i] = part.charAt(0).toUpperCase() + part.substr(1);
	}
	return parts.join('');
};

/**
 * Returns a Pascal-cased (e.g. ThisIsPascal) form of the string
 * @param {string} str The string of which to get the Pascal-cased form
 * @return {string}
 */
inflection.toPascalCase = function (str) {
	return inflection.toCamelCase(str, true);
};

/**
 * Returns a title-case form of the string
 * @param {string} str The string of which to get the title-case form
 * @return {string}
 */
inflection.toTitleCase = function (str) {
	str = str.replace(inflection.CommonRegExp.UNDERSCORES, ' ');
	var words = str.split(inflection.CommonRegExp.SPACES);
	for (var i = 0, ii = words.length; i < ii; ++i) {
		var parts = words[i].split('-');
		for (var o = 0, oo = parts.length; o < oo; ++o) {
			var part = parts[o].toLowerCase();
			if (inflection.TITLE_LOWERCASE_WORDS.indexOf(part) < 0) {
				parts[o] = inflection.toCapitalized(part);
			}
		}
		words[i] = parts.join('-');
	}
	str = words.join(' ');
	str = str.charAt(0).toUpperCase() + str.substr(1);
	return str;
};

/**
 * Returns an underscored (e.g. abc_def_ghi) form of the string
 * @param {string} str The string of which to get the pascal-cased form
 * @return {string}
 */
inflection.toUnderscored = function (str) {
	str = str.replace(inflection.CommonRegExp.SPACES_OR_UNDERSCORES, '_');
	str = str.replace(inflection.CommonRegExp.UPPERCASE, '_$1');
	str = str.replace(inflection.CommonRegExp.UNDERSCORES, '_');
	str = str.replace(inflection.CommonRegExp.UNDERSCORE_PREFIX, '');
	return str.toLowerCase();
};

/**
 * Returns a dashed form of the string
 * @param {string} str The string of which to get the dashed form
 * @return {string}
 */
inflection.toDashed = function (str) {
	str = str.replace(inflection.CommonRegExp.SPACES_OR_UNDERSCORES, '-');
	return str;
};

/**
 * Returns a human readable form of the string
 * @param {string} str The string of which to get the human readable form
 * @param {boolean=} start_lowercase 
 * @return {string}
 */
inflection.toHumanized = function (str, start_lowercase) {
	str = str.toLowerCase();
	str = str.replace(inflection.CommonRegExp.ID_SUFFIX, '');
	str = str.replace(inflection.CommonRegExp.UNDERSCORES_OR_DASHES, ' ');
	return start_lowercase ? str : inflection.toCapitalized(str);
};

/**
 * Returns a capitalized form of the string
 * @param {string} str The string of which to get the capitalized form
 * @return {string}
 */
inflection.toCapitalized = function (str) {
	str = str.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.substr(1);
	return str;
};

/**
 * Returns a form of the string that can be used for a table name
 * @param {string} str The original string
 * @return {string}
 */
inflection.toTableName = function (str) {
	str = inflection.toUnderscored(str);
	str = inflection.toPlural(str);
	return str;
};

/**
 * Returns a form of the string that can be used for a class/constructor name
 * @param {string} str The original string
 * @return {string}
 */
inflection.toClassName = function (str) {
	str = inflection.toCamelCase(str);
	str = inflection.toSingular(str);
	return str;
};

/**
 * Returns a form of the string that can be used for a foreign key name
 * @param {string} str The original string
 * @return {string}
 */
inflection.toForeignKeyName = function (str) {
	str = inflection.toUnderscored(str);
	str += '_id';
	return str;
};

/**
 * Replaces all numbers in the string with their ordinal forms
 * @param {string} str The original string
 * @return {string}
 */
inflection.replaceNumbersWithOrdinals = function (str) {
	return str.replace(inflection.CommonRegExp.NUMBERS, function (num) {
		var singles = Number(num.slice(-1));
		var tens = Number(num.slice(-2, -1));
		if (tens !== 1) {
			if (singles === 1) return num + 'st';
			else if (singles === 2) return num + 'nd';
			else if (singles === 3) return num + 'rd';
		}
		return num + 'th';
	});
};