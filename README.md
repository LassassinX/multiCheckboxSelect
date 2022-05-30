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

If the select tag has `multiple` attribute or the `multiple: true` option, it will act as a multi checkbox select.

If we want custom value for each select dropdown item, then
```javascript
options ={
      ...,
      data: [{value: '1', text:'myText'}]
}
```
You can also combine data whose value and innerHTML defaults to the string provided and different value with different innerHTML
```javascript
options ={
      ...,
      data: [{value: '1', text:'myText'}, 'option2']
}
```

You can also set children (other instances of ```multiCheckboxSelect```) that will clear if the parent element is cleared, either by pressing the x on the input field or by calling the ```clear()``` method in jQuery

### HTML

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

If a placeholder attr is given as ```data-placeholder="my placeholder"```, it will override the placeholder placed during initialization of the ```multiCheckboxSelect``` instance

## Methods

|Returns|Method|Parameter|Description| 
|--------|-------------|----------|---------------------------------------------------------------------------------------------|
| void|appendData(data)|Array|Appends data to the current multi checkbox select instance.|
| void|initializeData(data)|Array| Removes all current data from the multiselect object and initializes with the passed dataset.|
| void|addChild(multicheckboxSelectInstance)|multiCheckboxSelect| Adds a child to this multicheckboxselect instance. Fires a new 'clear' event|
| void|clear()| void | Clears all the selections of the ```multiCheckboxSelect``` instance|

## Options
- `placeholder: 'Select country'` - Placeholder of the input field

- `data: ['data1', 'data2', {value: '3', text: 'data3'}]` - Append additional data-options to the select tag. You can pass an object with value and text which will reflect in the select tag's value and innerHTML.

- `multiple: true || false` - State whether it will be a multi checkbox select or a normal dropdown

- `entryName: "State"` - This will render `Selected # State(s)` when selecting with multi checkbox select 

## License
[MIT](https://choosealicense.com/licenses/mit/)
