# mxunitrunner README

Executes the selected mxunit tests in your default browser.  MxUnit is a unit test framework/library written for ColdFusion. You can learn more about MxUnit at http://mxunit.org/ : I have no affiliation with the smart folks who wrote MxUnit. I just wanted a tool to help me use MxUnit from within VSCode.

## Features

Will run a full test file or a selected test in your default browser.

To run a full file open the file, make sure no text is highlighted and run the mxunitrunner.  To run a specific test highlight the name of the test and then run the mxunitrunner.

You can run the mxunitrunner in two different ways:

1. via ctrl+alt+p and then entering "mxunit"
2. ctrl+shift+x  on windows or cmd+shift+x on mac


## Requirements

You need to have mxunit installed and working.  You also need to configure the extension on a workplace basis.

## Extension Settings

This extension contributes the following settings:

* `mxunit.baseUrl`: the root url of the website where the mxunit test should be run.


## Example
Here is an example of how this works.  I have a project called WARP with unittests in a directory under WARP called 'unittets'  sort of like:

```
c:\websites\WARP\Site\WARP
c:\websites\WARP\Site\WARP\unittests\..
```

The website url on my dev machine is http://warp.com/warp so I use that as my `mxunit.baseUrl` in my workspace settings I have :

```json
// Place your settings in this file to overwrite default and user settings.
{
    "mxunit" : {
        "baseUrl":"http://warp.com/warp" 
    }
    
}
``` 

Then when I am in a unit test file say at c:\websites\WARP\Site\WARP\unittests\com\importers\specialImporterTests.cfc I can hit the key combo for my platform and it will open a browser window 
that takes me to 
http://warp.com/warp/unittests/com/importers/specialImporterTests.cfc?method=runtestremote&output=html

If you select (highlight) a specific test name in the test cfc file and then hit the key combo it will execute just that test:
http://warp.com/warp/unittests/com/importers/specialImporterTests.cfc?method=runtestremote&output=html&testMethod=xmlFromOperatorTests


So pretty straightforward and simple really but does depend on the convention that your unit tests are somewhere within your actual website.


## Known Issues

none at the moment

## Release Notes


### 1.0.0
A few people have been using it and the readme is now pretty complete so I'm just baselining it at 1.0.0.

### 0.0.3

Initial release of mxunitrunner

