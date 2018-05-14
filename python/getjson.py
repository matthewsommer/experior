import urllib.request
import urllib.parse
import json

def lambda_handler(event, context):
    tasks = get_tasks(event['jql'],event['fields'])
    return transformJson(tasks)

def get_tasks(jql, fields, startAt = 0):
    response = urllib.request.urlopen('https://jira.mattsommer.io/rest/api/2/search?jql=' + jql + '&startAt=' + str(startAt) + '&maxResults=100&fields=' + fields)
    result = json.loads(response.read().decode('utf-8'))
    if (result['startAt'] + result['maxResults']) < result['total']:
        return result['issues'] + get_tasks(jql,fields, startAt + 100)
    else:
        return result['issues']

def transformJson(tasks):
    data = []
    xstr = lambda s: s or ""
    for task in tasks:
        if (task['fields']['issuetype']['name'] == 'Reading'):
            data.append({"id": task['id'],"type": task['fields']['issuetype']['name'],"project": task['fields']['project']['name'],"title": task['fields']['summary'],"author": xstr(task['fields']['customfield_10100']), "status": task['fields']['status']['name'], "components": task['fields']['components']})
        elif (task['fields']['issuetype']['name'] == 'Epic'):
            data.append({"id": task['id'],"type": task['fields']['issuetype']['name'],"project": task['fields']['project']['name'],"summary": task['fields']['summary'], "status": task['fields']['status']['name'], "components": task['fields']['components']})
        elif (task['fields']['issuetype']['name'] == 'Story'):
            data.append({"id": task['id'],"type": task['fields']['issuetype']['name'],"project": task['fields']['project']['name'],"summary": task['fields']['summary'], "status": task['fields']['status']['name'], "components": task['fields']['components']})
        elif (task['fields']['issuetype']['name'] == 'Employment'):
            data.append({"id": task['id'],"type": task['fields']['issuetype']['name'],"project": task['fields']['project']['name'],"summary": task['fields']['summary'], "status": task['fields']['status']['name'], "title": task['fields']['customfield_10400'], "start": task['fields']['customfield_10904'], "end": task['fields']['customfield_10905'], "components": task['fields']['components']})
        else:
            data.append({"id": task['id'],"type": task['fields']['issuetype']['name'],"project": task['fields']['project']['name'],"summary": task['fields']['summary'], "status": task['fields']['status']['name'], "components": task['fields']['components']})
    return data

print(lambda_handler({"jql": "status%20%3D%20\"In%20Progress\"","fields": "issuetype,summary,status,project,customfield_10100,customfield_10400,customfield_10904,customfield_10905,components"},""))
