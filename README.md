jquery-depends-on
=================

Show/hide elements depending on others elements with jQuery


This plugin has first been created to handle form field but should works with anything, the code isn't perfect but it works. If the field is required, the required attribute is removed while the field is hidden.

How to use :

```javascript
    $('#myField').dependsOn({
        'elementToToggle': $('#parentToHide'), // optional, if what you want to hide is not the field itself
        'dependencies' : [
            {
                'element': $('input[name="firstField"]'),
                'value': 'theNeededValue'
            },
            {
                'element': $('input[name="secondField"]'),
                'value': ['aNeededValue', 'anotherNeededValue']
            }
        ],
    });
  ``
