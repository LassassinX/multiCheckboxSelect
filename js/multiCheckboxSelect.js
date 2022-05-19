// @@Author: Sanjid Islam Chowdhury
// MultiCheckboxSelect js@v1.2.0

try {
    jQuery.fn.extend({
        multiCheckboxSelect: function (properties) {

            let self = this[0]

            return this.each(() => {
                multiCheckboxSelect(self, properties)
            })

        },

        initializeData: function (data) {

            let self = this[0]

            return this.each(() => {
                self.initializeData(data)
            })

        },

        appendData: function (data) {
            let self = this[0]

            return this.each(() => {
                self.appendData(data)
            })
        },

        addChild: function (child) {
            let self = this[0]

            return this.each(() => {
                self.addChild(child)
            })
        },

        clear: function () {
            let self = this[0]

            return this.each(() => {
                self.clearAll()
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
            throw "Multi Checkbox Select element is not a valid select tag"
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

        self.initializeData = (data) => {
            for (i = self.options.length - 1; i >= 0; i--) {
                self.remove(i);
            }
            self.multiCheckboxSelectObj.initializeItems(data)
        }

        self.appendData = (data) => {
            self.multiCheckboxSelectObj.initializeItems(data)
        }

        self.addChild = (child) => {
            if (!(child instanceof Object)) {
                child = document.querySelector(child)
            }

            if (child instanceof jQuery) {
                child = child[0]
            }

            if (child.multiCheckboxSelectObj) {
                self.multiCheckboxSelectObj.children.push(child) //select tag
            } else {
                throw "Child is not an instance of multiCheckboxSelect"
            }
        }

        self.clearAll = () => {
            inputWrapper.querySelector('svg.clear').dispatchEvent(new Event('click'))
        }

        self.multiCheckboxSelectObj = {
            props: this.properties,
            isMouseInsideInput: false,
            isMouseInsideDropdown: false,
            isOpen: false,
            checkedItems: 0,
            selectAllBlock: null,
            children: [],
            dropdownHeight: 0,

            openDropdown: function (event) {
                if (!self.multiCheckboxSelectObj.isOpen) {
                    dropdownWrapper.classList.remove('hidden')
                    setTimeout(() => {
                        dropdownWrapper.style.height = 'auto'
                        dropdownWrapper.style.opacity = '1'
                        inputWrapper.querySelector('svg.dropdown-icon')
                            .style.transform = 'rotate(180deg)'
                        self.multiCheckboxSelectObj.isOpen = true

                    }, 1)

                    if (self.multiCheckboxSelectObj.dropdownHeight < dropdown.offsetHeight)
                        self.multiCheckboxSelectObj.dropdownHeight = dropdown.offsetHeight
                }
            },

            closeDropdown: function () {
                if (self.multiCheckboxSelectObj.isOpen) {
                    dropdownWrapper.style.height = '0'
                    dropdownWrapper.style.opacity = '0'
                    inputWrapper.querySelector('svg.dropdown-icon').style
                        .transform = 'rotate(0deg)'

                    setTimeout(() => {
                        dropdownWrapper.classList.add('hidden')
                        self.multiCheckboxSelectObj.isOpen = false
                    }, 1);
                    self.multiCheckboxSelectObj.fireChange()
                }
            },

            fireChange: function () {
                if (self.multiCheckboxSelectObj.props.multiple) {
                    inputWrapper.querySelector('input').value = ""
                    inputWrapper.querySelector('input').dispatchEvent(new Event('input'))
                }
                var changeEvent = new Event('change');
                self.dispatchEvent(changeEvent);
            },

            closeAble: function () {
                let temp = self.multiCheckboxSelectObj
                return (!temp.isMouseInsideDropdown && !temp
                    .isMouseInsideInput && temp.isOpen)
            },

            initializeItems: function (data, boolean) {
                if (boolean === undefined || boolean === true) {
                    self.options = ""
                    self.multiCheckboxSelectObj.parseData(data)
                    self.multiCheckboxSelectObj.checkedItems = 0
                    inputWrapper.querySelector('input').placeholder = self.multiCheckboxSelectObj.props.placeholder
                }

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
                dropdownSelected.innerHTML = ""

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
                            button.setAttribute('checked', !(button.getAttribute('checked') === 'true'))
                        })

                        button.addEventListener('click', self.multiCheckboxSelectObj.check.bind(null, button))

                        wrapper.appendChild(p)
                        wrapper.appendChild(button)

                        wrapper.addEventListener('click', (e) => {

                            if (e.currentTarget === e.target || e.target === p)
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
                            inputWrapper.querySelector('input').value = opt.text
                            self.multiCheckboxSelectObj.closeDropdown()
                        })

                        dropdown.append(wrapper)
                    }

                    //add to visible dropdown
                    if (self.multiCheckboxSelectObj.props.multiple) {
                        if (opt.checked) {
                            dropdownSelected.appendChild(wrapper)
                        } else
                            dropdown.appendChild(wrapper)
                    }
                })

                if (values.length === 0) {
                    let p = document.createElement('p')
                    p.classList.add('no-result')
                    p.textContent = "No Results Found"
                    if (self.multiCheckboxSelectObj.selectAllBlock !== null) {
                        self.multiCheckboxSelectObj.selectAllBlock.style.display = "none"
                    }
                    dropdown.appendChild(p)
                } else {
                    if (self.multiCheckboxSelectObj.selectAllBlock !== null) {
                        self.multiCheckboxSelectObj.selectAllBlock.removeAttribute('style')
                    }
                }
            },

            search: function (input) {
                let value = input.value.toLowerCase()

                let searchedEntries = Array.from(self.options).filter(x => {
                    if (self.multiCheckboxSelectObj.multiple) {
                        return x.innerHTML.toLowerCase().includes(value) || x.selected === true
                    } else {
                        return x.innerHTML.toLowerCase().includes(value)
                    }

                })

                searchedEntries = searchedEntries.map(x => Object.assign({}, {
                    value: x.value,
                    text: x.text,
                    checked: x.getAttribute('selected') === ''
                }))

                self.multiCheckboxSelectObj.insertItems(searchedEntries, dropdown)
            },

            insertElementInSortedFashion: function (element, container) {
                let isInserted = false
                let arr = Array.from(container.children)
                let elementTextContent = element.querySelector('p').textContent

                for (let i = 0; i < arr.length; i++) {
                    const x = arr[i]

                    xText = x.querySelector('p').textContent
                    if (xText.localeCompare(elementTextContent) > 0) {
                        container.insertBefore(element, x)
                        isInserted = true
                        break
                    }
                }

                if (!isInserted) {
                    container.appendChild(element)
                }
            },

            check: function (button) {

                let ele = Array.from(self.options).find(x => x.value === button.getAttribute('data-value'))

                let dropdownItem = dropdown.querySelector(`[data-value="${button.getAttribute('data-value')}"]`) || dropdownSelected.querySelector(`[data-value="${button.getAttribute('data-value')}"]`)

                if (button.getAttribute('checked') === 'true') {
                    ele.setAttribute('selected', '')
                    self.multiCheckboxSelectObj.checkedItems++

                    dropdownSelected.classList.remove('hidden')
                    dropdownWrapper.querySelector('.dropdown-selected-hr').classList.remove('hidden')

                    self.multiCheckboxSelectObj.insertElementInSortedFashion(dropdownItem, dropdownSelected)

                    if (dropdownSelected.childElementCount >= 3) {
                        //set maximum height to current height
                        dropdownSelected.style.maxHeight = dropdownSelected.offsetHeight + 'px'
                    }
                } else {
                    ele.removeAttribute('selected')
                    self.multiCheckboxSelectObj.checkedItems--

                    //sort dropdown

                    self.multiCheckboxSelectObj.insertElementInSortedFashion(dropdownItem, dropdown)

                    if (dropdownSelected.childElementCount === 0) {
                        dropdownSelected.classList.add('hidden')
                        dropdownWrapper.querySelector('.dropdown-selected-hr').classList.add('hidden')
                    }

                }

                if (self.multiCheckboxSelectObj.checkedItems > 0) {
                    inputWrapper.querySelector('input').placeholder = `Selected ${self.multiCheckboxSelectObj.checkedItems} ${self.multiCheckboxSelectObj.props.entryName}(s)`
                    self.multiCheckboxSelectObj.showClearButton()
                } else {
                    inputWrapper.querySelector('input').placeholder = self.multiCheckboxSelectObj.props.placeholder
                    self.multiCheckboxSelectObj.hideClearButton()
                }


            },

            showClearButton: function () {
                if (self.multiCheckboxSelectObj.props.multiple) {
                    inputWrapper.querySelector('svg.clear')
                        .style.display = 'block'

                    inputWrapper.querySelector('svg.clear')
                        .style.opacity = 0

                    inputWrapper.querySelector('svg.clear')
                        .style.transform = 'scale(.5)'

                    setTimeout(() => {
                        inputWrapper.querySelector('svg.clear')
                            .style.opacity = 1

                        inputWrapper.querySelector('svg.clear')
                            .style.transform = 'scale(1)'
                    }, 1);
                }
            },

            hideClearButton: function () {
                if (self.multiCheckboxSelectObj.props.multiple) {

                    inputWrapper.querySelector('svg.clear')
                        .style.display = 'none'
                }
            },

            clearSelection: function () {
                self.multiCheckboxSelectObj.selectAllBlock.getElementsByTagName('button').item(0).dispatchEvent(new Event('click'))

                if (self.multiCheckboxSelectObj.checkedItems !== 0) {
                    self.multiCheckboxSelectObj.clearSelection()
                } else {
                    self.dispatchEvent(new Event('clear'))
                    self.dispatchEvent(new Event('change'))

                    self.multiCheckboxSelectObj.children.forEach(e => {
                        e.multiCheckboxSelectObj.clearSelection()
                    })
                }

            },

            selectAll: function (thisButton) {
                inputWrapper.querySelector('input').value = ""

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
                    inputWrapper.querySelector('input').placeholder =
                        `Selected ${self.multiCheckboxSelectObj.checkedItems} ${self.multiCheckboxSelectObj.props.entryName}(s)`
                    self.multiCheckboxSelectObj.showClearButton()

                    dropdownSelected.classList.remove('hidden')
                    dropdownWrapper.querySelector('.dropdown-selected-hr').classList.remove('hidden')
                    //set maximum height of dropdownSelected to that of dropdown

                    dropdownSelected.style.maxHeight = self.multiCheckboxSelectObj.dropdownHeight + 'px'

                } else {
                    inputWrapper.querySelector('input').placeholder = self.multiCheckboxSelectObj.props
                        .placeholder
                    self.multiCheckboxSelectObj.hideClearButton()

                    dropdownSelected.classList.add('hidden')
                    dropdownWrapper.querySelector('.dropdown-selected-hr').classList.add('hidden')
                }

                self.multiCheckboxSelectObj.initializeItems(thisProps.data, false)
            },

            parseData: function (data) {

                //convert all data entries to options.value and options.text
                for (let i = 0; i < data.length; i++) {
                    let e = data[i]

                    if (!(e instanceof Object)) {
                        e = Object.assign({}, {
                            value: e,
                            text: e
                        })

                        data[i] = e
                    }
                }

                //generate values through the options. If options are in html, options are appended

                //add elements to actual select tag
                Object.entries(data).forEach(([key, value]) => {
                    var opt = document.createElement('option');
                    opt.value = value.value;
                    opt.innerHTML = value.text;
                    self.appendChild(opt);
                })

                //append options to props
                for (let i = 0; i < self.length; i++) {
                    if (data.find(x => x.value === self[i].value && x.text === self[i].innerHTML) === undefined) {
                        data.push({
                            value: self[i].value,
                            text: self[i].innerHTML
                        })
                    }
                }
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

        let iconTemplate = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.029 3.515" class="dropdown-icon">
                                 <path id="chevron-down"
                                     d="M6.3.105a.439.439,0,1,1,.571.668L3.8,3.409a.439.439,0,0,1-.571,0L.154.773A.439.439,0,1,1,.725.105L3.515,2.5,6.3.106Z"
                                     transform="translate(0 0)" fill="inherit" />
                             </svg>`

        let clearIconTemplate = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="26.6px"
                                    height="26.6px" viewBox="0 0 26.6 26.6" style="display: none; overflow:visible;enable-background:new 0 0 26.6 26.6;" xml:space="preserve" class="clear">
                                    <style type="text/css">
                                        .st0{fill:none;stroke:inherit;stroke-width:2;stroke-miterlimit:10;}
                                        .st1{fill:none;stroke:inherit;stroke-width:2;stroke-linecap:round;stroke-miterlimit:10;}
                                    </style>
                                    <defs>
                                    </defs>
                                    <g>
                                        <circle class="st0" cx="13.3" cy="13.3" r="12.3"/>
                                        <line class="st1" x1="7.4" y1="7.4" x2="19.2" y2="19.2"/>
                                        <line class="st1" x1="19.2" y1="7.4" x2="7.4" y2="19.2"/>
                                    </g>
                                </svg>`

        let searchIconTemplate = `<svg xmlns="http://www.w3.org/2000/svg" fill="inherit" viewBox="0 0 48 48" width="48px" height="48px" class="search">
            <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"/>
            </svg>`

        inputWrapper.innerHTML += clearIconTemplate
        inputWrapper.innerHTML += iconTemplate

        inputWrapper.prepend(inputField)

        inputWrapper.innerHTML = searchIconTemplate + inputWrapper.innerHTML

        inputWrapper.querySelector('svg.search').style.width = '0'

        wrapper.prepend(inputWrapper)

        inputWrapper.querySelector('svg.dropdown-icon').addEventListener('click', (e) => {
            self.multiCheckboxSelectObj.closeDropdown()
        })

        inputWrapper.querySelector('svg.clear').addEventListener('click', (e) => {
            self.multiCheckboxSelectObj.clearSelection()
            e.stopPropagation()
        })

        //generate the dropdown wrapper and dropdown
        let dropdownWrapper = document.createElement('div')
        dropdownWrapper.classList.add('dropdown-wrapper', 'hidden')

        dropdownWrapper.onmouseover = () => {
            self.multiCheckboxSelectObj.isMouseInsideDropdown = true
        }

        dropdownWrapper.onmouseout = () => {
            self.multiCheckboxSelectObj.isMouseInsideDropdown = false
        }

        let dropdownSelected = document.createElement('div')
        dropdownSelected.classList.add('dropdown', 'hidden')

        let dropdown = document.createElement('div')
        dropdown.classList.add('dropdown')

        dropdownWrapper.appendChild(dropdownSelected)

        let hr = document.createElement('hr')
        hr.classList.add('dropdown-selected-hr', 'hidden')
        dropdownWrapper.appendChild(hr)

        dropdownWrapper.appendChild(dropdown)

        wrapper.insertBefore(dropdownWrapper, self)

        //for multiple
        if (thisProps.multiple) {
            self.setAttribute('multiple', '')

            dropdown.setAttribute('data-multiple', 'true')

            dropdownSelected.setAttribute('data-multiple', 'true')

            //generate select all
            let selectAll = document.createElement('div')
            selectAll.classList.add('select-all')
            self.multiCheckboxSelectObj.selectAllBlock = selectAll
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

        self.multiCheckboxSelectObj.initializeItems(thisProps.data)

        //Important Functions
        document.addEventListener('click', () => {
            if (self.multiCheckboxSelectObj.closeAble()) {
                self.multiCheckboxSelectObj.closeDropdown()
            }
        })


        inputWrapper.querySelector('input').addEventListener('focus', (e) => {
            inputWrapper.querySelector('svg.search').removeAttribute('style')
        })

        inputWrapper.querySelector('input').addEventListener('blur', (e) => {
            inputWrapper.querySelector('svg.search').style.width = '0'
        })

        inputWrapper.querySelector('input').addEventListener('input', self.multiCheckboxSelectObj.search.bind(
            null, inputWrapper.querySelector('input')))



    } else {
        throw "Multi Checkbox Select already initialized once"
    }
}
