from typing import TypedDict, Annotated, Sequence
import operator
from langchain_core.messages import BaseMessage

from langgraph.graph import Graph
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Now you can access your environment variables using os.environ
os.environ['OPENAI_API_KEY'] = os.environ.get("API_KEY")


class AgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], operator.add]

model_gpt4o = ChatOpenAI(model="gpt-4o", temperature=0)


def function_1(input_1):
    response = model_gpt4o.invoke(input_1)
    return response.content

def function_2(input_2):
    return {"response": "Hi, i am Mex Ai assistant", "follow-up": ["What is my sales today?", "What is my sales this month?", "How many orders do I have today?"], "image": None}


graph = Graph()

#calling node 1 as agent
graph.add_node("agent", function_1)
graph.add_node("node_2", function_2)

graph.add_edge('agent', 'node_2')

graph.set_entry_point("agent")
graph.set_finish_point("node_2")

workflow = graph.compile()

response = workflow.invoke("Hey there")


