import requests
from collections import Counter
import os
import json
import urllib

# Set username and password in .netrc file to authenticate, for example:
# machine hostname123 login username123 password password123
# Set environment variable 'jira_host' to host for example jira.atlassian.net

print('\n\n*******************    Jira Stats Generator    **********************\n')

host = os.environ['jira_host']

base_url = 'https://' + host + '/rest/api/2/'
print('Jira Host REST URL: ' + base_url)
fields = base_url + 'field'
filters = base_url + 'filter'
dashboard = base_url + 'dashboard'
issuetype = base_url + 'issuetype'
project = base_url + 'project'
priority = base_url + 'priority'
projectCategory = base_url + 'projectCategory'
status = base_url + 'status'
workflow = base_url + 'workflow'


def search(jql=''):
    print("Starting Jira REST API Search - '" + jql + "'")
    issues = []
    current_page = 0
    total_pages = 1  # There is at least 1 page to return even if 0 results
    page_size = 100  # Results per page

    while current_page < total_pages:
        payload = {'jql': jql, 'startAt': current_page * page_size, 'maxResults': page_size}
        data = requests.get(base_url + "search?", params=payload, auth=()).json()
        issues = data['issues'] + issues
        total_pages = int(data['total'] / page_size) + (data['total'] % page_size > 0)
        current_page += 1

    print("Finished Jira REST API Search - " + str(len(issues)) + ' Results\n')
    return issues


print('\n*******************    Issues    **********************\n')

allIssues = search('issuetype = "Blog Post"')

with open('/tmp/jira-export-data.json', 'w') as f:
    json.dump(allIssues, f, ensure_ascii=False)

statuses = Counter(issue['fields']['status']['name'] for issue in allIssues).most_common()
print(statuses)

issuetypes = Counter(issue['fields']['issuetype']['name'] for issue in allIssues).most_common()
print(issuetypes)

priorities = Counter(
    issue['fields']['priority']['name'] for issue in allIssues if issue['fields']['priority'] is not None).most_common()
print(priorities)

projects = Counter(issue['fields']['project']['name'] for issue in allIssues).most_common()
print(projects)

resolutions = Counter(issue['fields']['resolution']['name'] for issue in allIssues if issue['fields']['resolution'] is not None).most_common()
print(resolutions)

assignees = Counter(issue['fields']['assignee']['displayName'] for issue in allIssues if issue['fields']['assignee'] is not None).most_common()
print(assignees)

reporters = Counter(issue['fields']['reporter']['displayName'] for issue in allIssues if issue['fields']['reporter'] is not None).most_common()
print(reporters)

# print('\n*******************    Fields    **********************')
#
# data = requests.get(fields, auth=(user, passwd)).json()
# total = len(data)
#
# print('Total Fields: ' + str(total))
# print('\n*******************    Filters    **********************')
#
# data = requests.get(filters, auth=(user, passwd)).json()
# total = len(data)
#
# print('Total Filters: ' + str(total))
# print('\n*******************    Workflows    **********************')
#
# data = requests.get(workflow, auth=(user, passwd)).json()
# total = len(data)
# print('Total Workflows: ' + str(total))
#
# print('\n*******************    Status\'    **********************')
#
# data = requests.get(status, auth=(user, passwd)).json()
# total = len(data)
# print('Total Status\': ' + str(total))
#
# print('\n*******************    Projects\'    **********************')
#
# data = requests.get(project, auth=(user, passwd)).json()
# total = len(data)
# print('Total Projects: ' + str(total))
# print('\n\n\n\n\n')
