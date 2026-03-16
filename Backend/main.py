from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

#This is to allow frontend to talk to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #In real app, URL will go here
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

#changing this to @app.post from app.get because we're SENDING data to analyse
@app.post('/pipelines/parse')
def parse_pipeline(nodes: str = Form(...), edges: str = Form(...)):
    
    nodes_list = json.loads(nodes)
    edges_list = json.loads(edges)

    num_nodes = len(nodes_list)
    num_edges = len(edges_list)

    is_dag_value = check_if_dag(nodes_list, edges_list)

    return {
        'num_nodes' : num_nodes,
        'num_edges' : num_edges,
        'is_dag' : is_dag_value
    }

# I used a DFS approach here because it's the most reliable way to find cycles. 
# If we hit a node that's already on our current recursion stack, we know there's a loop
def check_if_dag(nodes, edges):
    adj = {node['id']: [] for node in nodes}
    for edge in edges:
        adj[edge['source']].append(edge['target'])

    visited = set()
    rec_stack = set()

    def has_cycle(node_id):
        visited.add(node_id)
        rec_stack.add(node_id)
        for neighbour in adj.get(node_id, []):
            if neighbour not in visited:
                if has_cycle(neighbour):
                    return True
            elif neighbour in rec_stack:
                return True
        rec_stack.remove(node_id)
        return False
    
    for node in nodes:
        if node['id'] not in visited:
            if has_cycle(node['id']):
                return False   # loop has been detected
    return True  # if no loop found (DAG)
