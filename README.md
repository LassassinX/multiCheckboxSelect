# Multi Checkbox Select

A library for the ```<select>``` tag in HTML, with checkboxes in ```<select multiple>``` dropdown

## Usage

You can call the function multiCheckboxSelect(selectElement/selector, options) or for jQuery $(selectTag).multiCheckboxSelect(options). If the select tag has multiple or the multiple: true option, it will act as a multi checkbox select.

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

```javascript
multiCheckboxSelect('#selectTag')

var options = { 
      placeholder: 'Select States',
      entryName: 'State',
      data: ['option1', 'option2'],
}

multiCheckboxSelect('#selectTagMultiple', options)

```


## Options
```placeholder: 'Select country' //Placeholder of the input field```

```data: ['data1', 'data2'] //Append additional data-options to the select tag```

```multiple: true || false //State whether it will be a multi checkbox select or a normal dropdown```

`entryName: 'State' //This will render Selected # State(s) when selecting with multi checkbox select`

## License
[MIT](https://choosealicense.com/licenses/mit/)
