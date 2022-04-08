// @@Author: Sanjid Islam Chowdhury
// MultiCheckboxSelect js@v1.0.2.1

try {
    jQuery.fn.extend({
        multiCheckboxSelect: function (properties) {

            let self = this[0]

            return this.each(() => {

                multiCheckboxSelect(self, properties)

            })

        }
    })
} catch (error) {

}


function multiCheckboxSelect(element, properties) {

    if (element instanceof HTMLElement && element.tagName === 'SELECT') {
        this.element = element //select tag
    } else {
        element = document.querySelector(element)

        if (element instanceof HTMLElement && element.tagName === 'SELECT') {
            this.element = element //select tag
        } else {
            throw "multiCheckboxSelect element is not a valid select tag"
        }
    }

    let self = this.element

    this.properties = {
        //default
        placeholder: (properties !== undefined && properties.placeholder !== undefined) ? properties.placeholder : 'Default Placeholder',
        data: (properties !== undefined && properties.data !== undefined) ? properties.data : [],
        multiple: (properties !== undefined && properties.multiple !== undefined) ? properties.multiple : false || self.getAttribute('multiple') !== null,
        entryName: (properties !== undefined && properties.entryName !== undefined) ? properties.entryName : 'Entrie',
    }

    if (!self.multiCheckboxSelectObj) {
        self.value = ""

        self.multiCheckboxSelectObj = {
            props: this.properties,

            isMouseInsideInput: false,
            isMouseInsideDropdown: false,
            isOpen: false,
            checkedItems: 0,

            openDropdown: function (event) {
                if (!self.multiCheckboxSelectObj.isOpen) {
                    dropdownWrapper.classList.remove('hidden')
                    setTimeout(() => {
                        dropdownWrapper.style.height = 'auto'
                        dropdownWrapper.style.opacity = '1'
                        inputWrapper.getElementsByTagName('svg').item(0)
                            .style.transform = 'rotate(180deg)'
                        self.multiCheckboxSelectObj.isOpen = true

                    }, 1)

                }
            },

            closeDropdown: function () {
                if (self.multiCheckboxSelectObj.isOpen) {
                    dropdownWrapper.style.height = '0'
                    dropdownWrapper.style.opacity = '0'
                    inputWrapper.getElementsByTagName('svg').item(0).style
                        .transform = 'rotate(0deg)'

                    setTimeout(() => {
                        dropdownWrapper.classList.add('hidden')
                        self.multiCheckboxSelectObj.isOpen = false
                    }, 1);
                }
            },

            closeAble: function () {
                let temp = self.multiCheckboxSelectObj
                return (!temp.isMouseInsideDropdown && !temp
                    .isMouseInsideInput && temp.isOpen)
            },

            initializeItems: function () {
                let entries = Array.from(self.options).map(x => Object
                    .assign({}, {
                        value: x.value,
                        text: x.text,
                        checked: x.getAttribute('selected') === ''
                    }))
                self.multiCheckboxSelectObj.insertItems(entries)
            },

            insertItems: function (values) {
                dropdown.innerHTML = ""
                values.sort((a, b) => a.text.localeCompare(b.text))
                Object.entries(values).forEach(([ind, opt]) => {
                    //basic template
                    let wrapper = document.createElement('div')
                    wrapper.setAttribute('data-value', opt.value)

                    let p = document.createElement('p')
                    p.textContent = opt.text

                    if (self.multiCheckboxSelectObj.props.multiple) {
                        let button = document.createElement('button')
                        button.setAttribute('checked', opt.checked)
                        button.setAttribute('data-value', opt.value)
                        button.setAttribute('type', "button")
                        button.addEventListener('click', () => {
                            button.setAttribute('checked', !(button
                                .getAttribute('checked') ===
                                'true'))
                        })

                        button.addEventListener('click', self
                            .multiCheckboxSelectObj.check.bind(null,
                                button))

                        wrapper.appendChild(p)
                        wrapper.appendChild(button)

                        wrapper.addEventListener('click', (e) => {
                            if (e.currentTarget === e.target)
                                button.click()
                        })

                        let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="14.071" height="11.062"
                                            viewBox="0 0 14.071 11.062"><path id="Path_469" data-name="Path 469" d="M13.5,12.054l2.594,2.594L24.742,6"
                                            transform="translate(-12.086 -4.586)" fill="none" stroke="#46d2c4"
                                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                    </svg>`

                        button.innerHTML = icon

                    }

                    if (!self.multiCheckboxSelectObj.props.multiple) {
                        wrapper.appendChild(p)
                        
                        wrapper.addEventListener('click', () => {
                            self.value = opt.value
                            inputField.value = opt.text
                            self.multiCheckboxSelectObj.closeDropdown()
                        })
                    } 

                    //add to visible dropdown
                    dropdown.appendChild(wrapper)
                })

                if (values.length === 0) {
                    let p = document.createElement('p')
                    p.classList.add('no-result')
                    p.textContent = "No Results Found"
                    dropdown.appendChild(p)
                }
            },

            search: function (input) {
                let value = input.value.toLowerCase()
                let searchedEntries = Array.from(self.options).filter(x => x.innerHTML.toLowerCase().includes(value))
                searchedEntries = searchedEntries.map(x => Object.assign({}, {
                    value: x.value,
                    text: x.text,
                    checked: x.getAttribute('selected') === ''
                }))

                self.multiCheckboxSelectObj.insertItems(searchedEntries)
            },

            check: function (button) {

                let ele = Array.from(self.options).find(x => x.value === button.getAttribute('data-value'))

                if (button.getAttribute('checked') === 'true') {
                    ele.setAttribute('selected', '')
                    self.multiCheckboxSelectObj.checkedItems++
                } else {
                    ele.removeAttribute('selected')
                    self.multiCheckboxSelectObj.checkedItems--
                }

                if (self.multiCheckboxSelectObj.checkedItems > 0) {
                    inputField.placeholder =
                        `Selected ${self.multiCheckboxSelectObj.checkedItems} ${self.multiCheckboxSelectObj.props.entryName}(s)`
                } else {
                    inputField.placeholder = self.multiCheckboxSelectObj.props.placeholder
                }

            },

            selectAll: function (thisButton) {
                inputField.value = ""
                let boolean = thisButton.getAttribute('checked') === 'true'

                Array.from(self.options).forEach(e => {
                    if (boolean) {
                        if (e.getAttribute('selected') === null) {
                            e.setAttribute('selected', '')
                            self.multiCheckboxSelectObj.checkedItems++
                        }
                    } else {
                        if (e.getAttribute('selected') !== null) {
                            e.removeAttribute('selected')
                            self.multiCheckboxSelectObj.checkedItems--
                        }
                    }
                })

                if (self.multiCheckboxSelectObj.checkedItems > 0) {
                    inputField.placeholder =
                        `Selected ${self.multiCheckboxSelectObj.checkedItems} ${self.multiCheckboxSelectObj.props.entryName}(s)`
                } else {
                    inputField.placeholder = self.multiCheckboxSelectObj.props
                        .placeholder
                }

                self.multiCheckboxSelectObj.initializeItems()
            }
        }

        let thisProps = self.multiCheckboxSelectObj.props

        self.style.display = "none"

        //generate the base wrapper classes
        let wrapper = document.createElement('div')
        wrapper.classList.add('multi-checkbox-select-wrapper')

        self.parentNode.insertBefore(wrapper, self)
        wrapper.appendChild(self)


        // //generate input wrapper and input field
        let inputWrapper = document.createElement('div')
        inputWrapper.classList.add('input-wrapper')

        //add onclick listener for dropdown
        inputWrapper.onclick = self.multiCheckboxSelectObj.openDropdown
        inputWrapper.onmouseover = () => {
            self.multiCheckboxSelectObj.isMouseInsideInput = true
        }
        inputWrapper.onmouseout = () => {
            self.multiCheckboxSelectObj.isMouseInsideInput = false
        }

        let inputField = document.createElement('input')
        inputField.type = ''
        inputField.placeholder = thisProps.placeholder

        let iconTemplate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.029 3.515">
                                 <path id="chevron-down"
                                     d="M6.3.105a.439.439,0,1,1,.571.668L3.8,3.409a.439.439,0,0,1-.571,0L.154.773A.439.439,0,1,1,.725.105L3.515,2.5,6.3.106Z"
                                     transform="translate(0 0)" fill="inherit" />
                             </svg>`


        inputWrapper.innerHTML += iconTemplate
        inputWrapper.getElementsByTagName('svg').item(0).onclick = self
            .multiCheckboxSelectObj.closeDropdown
        inputWrapper.prepend(inputField)
        wrapper.prepend(inputWrapper)

        //generate the dropdown wrapper and dropdown
        let dropdownWrapper = document.createElement('div')
        dropdownWrapper.classList.add('dropdown-wrapper', 'hidden')

        dropdownWrapper.onmouseover = () => {
            self.multiCheckboxSelectObj.isMouseInsideDropdown = true
        }

        dropdownWrapper.onmouseout = () => {
            self.multiCheckboxSelectObj.isMouseInsideDropdown = false
        }

        let dropdown = document.createElement('div')
        dropdown.classList.add('dropdown')

        dropdownWrapper.appendChild(dropdown)

        wrapper.insertBefore(dropdownWrapper, self)

        //convert all data entries to options.value and options.text
        for (let i = 0; i < thisProps.data.length; i++) {
            let e = thisProps.data[i]

            if (!(e instanceof Object)) {
                e = Object.assign({},{
                    value: e,
                    text: e
                })

                thisProps.data[i] = e
            }
        }

        //generate values through the options. If options are in html, options are appended

        //add elements to actual select tag
        Object.entries(thisProps.data).forEach(([key, value]) => {
            var opt = document.createElement('option');
            opt.value = value.value;
            opt.innerHTML = value.text;
            self.appendChild(opt);
        })
        
        console.log(Object.assign({}, thisProps.data))

        //append options to props
        for (let i = 0; i < self.length; i++) {
            if (thisProps.data.find(x => x.value === self[i].value && x.text === self[i].innerHTML) === undefined) {
                thisProps.data.push({
                    value: self[i].value,
                    text: self[i].innerHTML
                })
            } 
        }


        //for multiple
        if (thisProps.multiple) {
            self.setAttribute('multiple', '')

            dropdown.setAttribute('data-multiple', 'true')

            //generate select all
            let selectAll = document.createElement('div')
            selectAll.classList.add('select-all')
            let p = document.createElement('p')
            p.textContent = 'Select All'

            let button = document.createElement('button')
            button.setAttribute('checked', 'false')
            button.setAttribute('type', "button")
            button.addEventListener('click', () => {
                button.setAttribute('checked', !(button
                    .getAttribute('checked') ===
                    'true'))
            })

            button.addEventListener('click', self.multiCheckboxSelectObj.selectAll.bind(
                null, button))

            selectAll.appendChild(p)
            selectAll.appendChild(button)

            let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="14.071" height="11.062"
                                            viewBox="0 0 14.071 11.062"><path id="Path_469" data-name="Path 469" d="M13.5,12.054l2.594,2.594L24.742,6"
                                            transform="translate(-12.086 -4.586)" fill="none" stroke="#46d2c4"
                                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                    </svg>`

            button.innerHTML = icon

            dropdownWrapper.prepend(document.createElement('hr'))
            dropdownWrapper.prepend(selectAll)

        }

        //for single
        if (!thisProps.multiple) {

        }

        self.multiCheckboxSelectObj.initializeItems()

        //Important Functions
        document.addEventListener('click', () => {
            if (self.multiCheckboxSelectObj.closeAble()) {
                self.multiCheckboxSelectObj.closeDropdown()
            }
        })

        inputField.addEventListener('input', self.multiCheckboxSelectObj.search.bind(
            null, inputField))

    } else {
        throw "multiCheckboxSelect already initialized once"
    }
}
