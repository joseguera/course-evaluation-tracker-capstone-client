import React, { Component } from 'react'
import { Section } from '../../components/Utils/Utils'
import './NotFoundPage.css'

export default class NotFoundPage extends Component {
    render() {
        return (
            <div className='error-body'>
                <Section className='NotFoundPage'>
                    <h2 className='error-heading'>404 - Page not found</h2>
                    <p>Try clicking on the <span className='accent'>Home Page</span> or <span className='accent'>My Noms</span> tab.</p>
                </Section>
            </div>
        )
    }
}