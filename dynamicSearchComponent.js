import { LightningElement, track } from 'lwc';
import searchRecords from '@salesforce/apex/DynamicSearchController.searchRecords';

export default class DynamicSearchComponent extends LightningElement {
    @track baseObject = '';
    @track searchFields = '';
    @track searchResults = '';
    @track searchCriteria = '';
    @track results = [];
    @track columns = [];

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'baseObject') {
            this.baseObject = event.target.value;
        } else if (field === 'searchFields') {
            this.searchFields = event.target.value;
        } else if (field === 'searchResults') {
            this.searchResults = event.target.value;
        } else if (field === 'searchCriteria') {
            this.searchCriteria = event.target.value;
        }
    }

    handleSearch() {
        searchRecords({
            baseObject: this.baseObject,
            searchFields: this.searchFields,
            searchResults: this.searchResults,
            searchCriteria: this.searchCriteria
        })
        .then(result => {
            // Process the results to handle nested fields and links
            this.results = result.map(record => {
                let newRecord = {};
                for (let field in record) {
                    if (field.includes('.')) {
                        newRecord[field.replace('.', '_')] = record[field];
                    } else {
                        newRecord[field] = record[field];
                    }
                }
                if (this.baseObject.toLowerCase() === 'contact') {
                    newRecord.contact_link = '/' + record.Id;
                }
                if (this.searchResults.includes('Account.Name') && record.AccountId) {
                    newRecord.account_link = '/' + record.AccountId;
                }
                return newRecord;
            });

            // Set columns dynamically
            this.columns = this.searchResults.split(',').map(field => {
                return { label: field.trim(), fieldName: field.trim().replace('.', '_'), type: 'text' };
            });

            // Add link column for Contact Name
            if (this.baseObject.toLowerCase() === 'contact') {
                this.columns.unshift({
                    label: 'Contact Name',
                    fieldName: 'contact_link',
                    type: 'url',
                    typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' }
                });
            }

            // Add link column for Account Name if included in search results
            if (this.searchResults.includes('Account.Name')) {
                this.columns.push({
                    label: 'Account Name',
                    fieldName: 'account_link',
                    type: 'url',
                    typeAttributes: { label: { fieldName: 'Account_Name' }, target: '_blank' }
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}