# Multi Checkbox Select

A library for the ```<select>``` tag in HTML, with checkboxes in ```<select multiple>``` dropdown

## Installation

Put the multiCheckboxSelect.js and multi-checkbox-select.css files in your project and link them

## Usage

### Initialization

JS

```javascript
multiCheckboxSelect('#selectTag')
```

or

```javascript
var options = { 
      placeholder: 'Select States',
      entryName: 'State',
      data: ['option1', 'option2'],
}

multiCheckboxSelect('#selectTagMultiple', options)
```

For jQuery

```javascript
$('#selectTag').multiCheckboxSelect()
```

or

```javascript
var options = { 
      placeholder: 'Select States',
      entryName: 'State',
      data: ['option1', 'option2'],
}

$('#selectTag').multiCheckboxSelect(options)
```

You can call the function `multiCheckboxSelect(selectElement/selector, options)` or for jQuery `$(selectTag).multiCheckboxSelect(options)`. If the select tag has `multiple` attribute or the `multiple: true` option, it will act as a multi checkbox select.

HTML

```HTML
<select id="selectTagMultiple" multiple>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
</select>

<select id="selectTag">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
 </select>
```

## Options
- `placeholder: 'Select country'` - Placeholder of the input field

- `data: ['data1', 'data2']` - Append additional data-options to the select tag

- `multiple: true || false` - State whether it will be a multi checkbox select or a normal dropdown

- `entryName: "State"` - This will render `Selected # State(s)` when selecting with multi checkbox select 

## License
[MIT](https://choosealicense.com/licenses/mit/)
