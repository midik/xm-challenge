### Node.js - Payload CMS Exercise

Introduction
When implementing this solution try to keep in mind,
• Separation of concerns and reusability
• Best coding practices
• Performance optimizations whenever possible
• Portability of the application

Exercise
In this exercise, you need to create a Node.js application with an API endpoint that receives the following values:
• Company Symbol
• Start Date (YYYY-mm-dd)
• End Date (YYYY-mm-dd)
• Email
You can adjust the above property names based on your API implementation best practices.

The available options for the Company Symbol field can be found here: https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed_json/data/a5bc7580d6176d60ac0b2142ca8d7df6/nasdaq-listed_json.json

After the endpoint is used, the following actions must be done:

1) Validate the values and return the appropriate messages. Validation rules:
   • Company Symbol: required, valid symbol
   • Start Date: required, valid date, format YYYY-mm-dd, less or equal than End Date, less or equal than current date
   • End Date: required, valid date, format YYYY-mm-dd, greater or equal than Start Date, less or equal than current date
   • Email: required, valid email

2) Return the historical quotes for the submitted Company Symbol in the given date range. Item properties:
   Date | Open | High | Low | Close | Volume

You can adjust the above property names based on your API implementation best practices.
The interval of the Date should be daily.

Historical data should be retrieved using “https://yh-finance.p.rapidapi.com/stock/v3/get-chart” API.
Example: https://yh-finance.p.rapidapi.com/stock/v3/get-chart?interval=1mo&symbol=AMRN&range=5y&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit

Header Parameters:
• X-RapidAPI-Key: XXXXXXXXXXXXXXXXXXXXXXXXXXX
• X-RapidAPI-Host: yh-finance.p.rapidapi.com
Check the full documentation here: https://rapidapi.com/apidojo/api/yh-finance/playground/apiendpoint_8db71d88-e9a5-4b0c-8de9-4400f8559dfd

NOTE: The historical data service requires the token X-RapidAPI-Key, which is provided in the same email as this document.

3) Send to the submitted Email an email message, using as:
   • Subject: The submitted company’s name
    o i.e. for submitted Company Symbol = GOOG => Company’s Name = Google
   • Body: Start Date and End Date
    o i.e. From 2020-01-01 to 2020-01-31
   • Attachment: The retrieved historical quotes as a CSV file. Data columns:
    Date | Open | High | Low | Close | Volume

NOTES:
• The exercise can be developed using Node.js (TypeScript), but Payload CMS is preferred
• Tests are mandatory part of the exercise
• Keep in mind that we cannot change “/etc/hosts” or “C:\Windows\System32\drivers\etc\hosts” on our PCs
• Create a private GitHub repository and share it with the account: payloadinterviews@trading-point.com
• Have fun

Bonus
Consider the following for a better solution:
• Use Docker
• Have 100% testing coverage
• Provide OpenAPI documentation