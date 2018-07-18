import requests
import getpass

host = raw_input("Host: ")
jql = raw_input("JQL: ")

response = requests.get('https://' + host + '/rest/api/2/search?jql=' + jql + '&fields=summary',
                        auth=(raw_input("Username:"), getpass.getpass('Password:')))
data = response.json()


total_issue_count = data['total']


print('Total Issues: ' + str(total_issue_count))
