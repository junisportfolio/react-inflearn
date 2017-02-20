import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import ContactCreate from './ContactCreate';

import update from 'react-addons-update';


export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            selectedKey: -1,
            contactData: [
                {
                    name: 'Abet',
                    phone: '010-000-0001'
                },
                {
                    name: 'Betty',
                    phone: '010-000-0002'
                },
                {
                    name: 'Charlie',
                    phone: '010-000-0003'
                },
                {
                    name: 'David',
                    phone: '010-000-0004'
                },
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    };


    componentWillMount() {
        const contactData = localStorage.contactData;

        if(contactData) {
            this.setState({
                contactData: JSON.parse(contactData)
            });
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if(JSON.stringify(prevState.contactData) != JSON.stringify(this.state.contactData)) {
            localStorage.contactData = JSON.stringify(this.state.contactData);
        }
    }
    /**
     *  localStorage.clear();
     *  로컬 스토리지 초기화
     * */


    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    };

    handleClick(key) {
        this.setState({
            selectedKey: key
        });
    };

    /*Edit*/
    handleCreate(contact) {
        this.setState({
            contactData: update(this.state.contactData, {
                $push: [contact]
            })
        })
    };

    handleRemove() {
        if(this.state.selectedKey < 0){
            return;
        }

        this.setState({
            contactData: update(this.state.contactData,
                {
                    $splice: [[this.state.selectedKey, 1]]
                }
            ),
            selectedKey: -1
        })
    };

    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            ),
        })
    };

    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
                }
            )
            return data.map((Contact, i) => {
                return (
                    <ContactInfo
                        contact={Contact}
                        key={i}
                        onClick={() => this.handleClick(i)}
                    />
                );
            });
        };

        return (
            <div>
                <h1>
                    Contacts
                </h1>
                <input
                    type="text"
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />


                <div>
                    {mapToComponents(this.state.contactData)}
                </div>
                <ContactDetails
                    isSelected={this.state.selectedKey != 1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                />
                <ContactCreate
                    onCreate={this.handleCreate}
                />

            </div>
        );

    }
}
