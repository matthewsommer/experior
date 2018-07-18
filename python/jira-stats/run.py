import requests
import getpass

print('\n\n*******************    Jira Stats Generator    **********************\n\n')

host = 'https://' + raw_input("Jira Host: ") + '/rest/api/2/'
rest_path = ""
jql = '?jql=' + raw_input("JQL: ")

search = host + 'search' + jql + '&fields=summary'
fields = host + 'field'
filters = host + 'filter'
dashboard = host + 'dashboard'
issuetype = host + 'issuetype'
project = host + 'project'
priority = host + 'priority'
projectCategory = host + 'projectCategory'
status = host + 'status'
workflow = host + 'workflow'

user = raw_input("Username:")
passwd = getpass.getpass('Password:')

print('\n*******************    Issues    **********************')

data = requests.get(search, auth=(user, passwd)).json()
total = data['total']

print('Total Issues: ' + str(total))
print('\n*******************    Fields    **********************')

data = requests.get(fields, auth=(user, passwd)).json()
total = len(data)

print('Total Fields: ' + str(total))
print('\n*******************    Filters    **********************')

data = requests.get(filters, auth=(user, passwd)).json()
total = len(data)

print('Total Filters: ' + str(total))
print('\n*******************    Workflows    **********************')

data = requests.get(workflow, auth=(user, passwd)).json()
total = len(data)
print('Total Workflows: ' + str(total))

print('\n*******************    Status\'    **********************')

data = requests.get(status, auth=(user, passwd)).json()
total = len(data)
print('Total Status\': ' + str(total))

print('\n*******************    Projects\'    **********************')

data = requests.get(project, auth=(user, passwd)).json()
total = len(data)
print('Total Projects: ' + str(total))
print('\n\n\n\n\n')
