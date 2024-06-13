# Dynamic-Search-Component
Developed Lightning Component to search any Salesforce object based on dynamically assigned Object/Search filters fields and fetch results using dynamically assigned search result fields. 
A Salesforce Admin from Customer end should be able to Configure the behavior of the component. To define what object/search field and Search results should display using that component.

As a recommendation consider the following parameters that the Lightning component can dynamically assign at runtime.

1. “Base object” – Stores the Object value under scope for one component.
2. 2. “Search fields” – Stores the Comma Separate API Names of fields on Base Object to be used for search.
3. “Search results” - Stores the Comma Separate API Names of fields on Base Object and related Objects that can be part of Search results.

Lightning component should be able to support but not limited to following inputs.
# Example 1:
Base Object: Contact
Search Fields: account.name,title,email
Search Result: name,mailingcity,mailingcountry,account.name

# Example 2:
Base Object: Account
Search Fields: name,owner.name
Search Result: name,AccountSource,Type

# Note: Both Contact and Account are having link to related Contact and Account Records. 

# Attaching the UI 
![image](https://github.com/Suvimal-Kundu/Dynamic-Search-Component/assets/70266779/3834e2e1-3da2-4999-baa5-c161ce122d9f)

# The apex test class coverage is 100%. Attached the evidence below.
![image](https://github.com/Suvimal-Kundu/Dynamic-Search-Component/assets/70266779/2a4246d9-a77f-4c49-a257-4a309fbc8d3e)

