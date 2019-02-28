# Flatiron Cohort Manager

A command line tool for managing Flatiron Cohorts, streamlining education team workflows such as:

* Checking a cohorts lab progress
* Managing cohort specific links (like AA and attedance google sheets)
* Generating and publishing lecture content
* Editing a cohorts learn.co homepage

## System Requirements
* Git CLI Tools authenticated with a Flatiron GitHub account

## Installation

```bash
npm install -g flatiron-cohort-manager
```

## Documentation

#### `install <name> <learnID> <togetherID>`

* Creates a new cohort folder in your root, cloning lecture code and creating the default associated weblinks. This command will set your active cohort to the one created.
* Arguments
  * <name>: the name of the cohort, e.g. `houston-web-111919`
  * <learnID>: the ID of the cohorts batch in learn. You can get this from the URL of the cohort after selecting them in organizations
  * <togetherID>: the ID of the cohort in Learn Together. You can get this from the URL as well

#### `select-cohort`
* Opens a menu to select a new active cohort


#### `new-lecture [lectureNumber]`

- Creates a new lecture within the lectue code for the active cohort. You can initialize an empty lecture folder, or copy from another lecture. Opens the lecture folder with your selected code editor
- Arguments
  - <lectureNumber> (optional): if provided, sets an arbitrary number for the lecture (the next number in sequence is the default)

#### `edit-lecture`

- Opens a selected lecture with your default code editor

#### `edit-home`

- Opens the active cohorts learn.co home page using your default code editor.

#### `open <resource>`

- Opens an external resource related to the active cohort given the resource name. If the selected resource has not been linked to the active cohort, you will be prompted to link the resource
- The following resources are supported by default:
  - `progress`- opens the active cohort's lab progress
  - `together`- opens the active cohort's Learn Together page
  - `assignments`- opens a learn.co assignments search for the active cohort.
    - Note: you must use the cohorts name (e.g, houston-web-111918)  in the assignment title for this feature to work
  - `home`- opens the active cohort's home page in GitHub
  - `curriculum`- opens the learn.co curriculum page, used for deploying labs
  - `wiki`- opens the Flatiron Education Team Wiki in GitHub
- The following resources are recommended, and can be added using `link`:
  - `aa`- opens the attitude-apptitude sheet  (link can be found in the cohorts instructor slack channel)
  - `attendance`- opens the attendance sheet for the active cohort (link can be found in the cohorts slack channel)

#### `link <resource> <url>` 

- Links a named resource to the active cohort
- Arguments
  - <resource>: The name of the resource you wish to link, e.g. `attendance`
  - <url>: The URL of the resource

#### `set <variable> <value>`

- Sets a state variable. Any variable can be set, and will be associated with the active cohort by default. The following variables are recognized by the system:
  - 'active-cohort'- the name of the cohort to consider "active". Will default to the most recently added cohort
  - 'code-editor'- the name of an installed program to use when editing code. Defaults to Visual Studio Code.
  - 'markdown-editor'- the name of an installed program to use when editing markdown. Defaults to Typora.
- Arguments
  - <variable>: The name of the variable to set
  - <value>: The value to set the variable to

#### `reset`

- Deletes all of the cohort manager's associated data. This does not uninstall the npm module itself.