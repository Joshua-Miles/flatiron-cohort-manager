# Flatiron Cohort Manager

A command line tool for managing Flatiron Cohorts, streamlining education team workflows such as:

* Checking a cohorts lab progress and assignments
* Generating and publishing lecture content, including lecture code, recordings, and learn.co homepage

## System Requirements
* Git CLI Tools authenticated with a Flatiron GitHub account

## Installation

```bash
npm install -g flatiron-cohort-manager
```


## Documentation

#### `install <name> <learnID>`

* Creates a new cohort folder in your root, cloning lecture code and creating the default associated weblinks. This command will set your active cohort to the one created.
* Arguments
  * <name>: the name of the cohort, e.g. `houston-web-111919`
  * <learnID>: the ID of the cohorts batch in learn. You can get this from the URL of the cohort after selecting them in organizations


#### `select-cohort`
* Opens a menu to select a new active cohort

#### `new-lecture`

- Creates a new lecture template. Opens the lecture folder with your selected code editor. Prompts the selection of a module when creating. This is saved with the lecture code so that the lecture can be linked in the learn.co homepage correctly when published

#### `edit-lecture`

- Opens a selected lecture template with your default code editor

#### `give-lecture`

- Copys a lecture template into the lecture code repository of the active cohort
- Opens the copied lecture code with your selected code editor
- Ends with a prompt to begin recording the lecture. When you select the prompt by hitting enter, your screen will begin recording until you select the prompt to start. The recording will then be optimized and uploaded to YouTube, before being linked in the learn.co home page. Lastly, the lecture code will be committed and pushed to GitHub

> The keyfile used by the cohort manager to authenticate with YouTube is only good for 8 uploads per day. If you intend to use the tool long term, please procure your own keyfile (https://developers.google.com/youtube/registering_an_application), and replace the oauth2.keys.json file within the `My-Cohorts` folder. Note that the keyfile cannot be procured using a Flatiron GSuite account, as these have an un-alterable quota of 0 video uploads

> There are a handful of undocumented commands, including `open-lecture`, `record-lecture`, and `upload-lecture`, which `give-lecture` calls internally, but can be used to do each of the above steps piece by piece when necessary.

#### `edit-home`

- Opens the ejs template for the active cohorts learn.co home page using your default code editor.

#### `open <resource>`

- Opens an external resource related to the active cohort given the resource name. If the selected resource has not been linked to the active cohort, you will be prompted to link the resource
- The following resources are supported by default:
  - `progress`- opens the active cohort's lab progress
  - `assignments`- opens a learn.co assignments search for the active cohort.
    - Note: you must use the cohorts name (e.g, houston-web-111918)  in the assignment title for this feature to work
  - `home`- opens the active cohort's home page in GitHub
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