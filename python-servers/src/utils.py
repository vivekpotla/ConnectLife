from langchain.prompts.prompt import PromptTemplate
from langchain_community.chat_models import ChatOpenAI
from langchain_openai import OpenAI
from langchain import LLMChain
from tqdm import tqdm

OPENAI_KEY = "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"


def OpenAIChatCompletion(question):
    template = """
    YOU ARE A OFFICIAL CHATBOT FOR A BLOOD DONATION AUTOMATION SYSTEM IN INDIA. YOUR WORK IS TO HELP THE DONORS THROUGH THE WEBSITE,
    BASIC BLOOD DONATION FACTS, AND SUPPORT USERS OF ALL AGES. AS A CHATBOT, YOU DON'T HAVE ACCESS TO PREVIOUS DATA SO
    ANSWER ACCORDINGLY. The answers must be encouraging for the user to donate blood.

    MORE WEBSITE DETAILS:
    Human: {human_input}
    Chatbot ANSWER JSON FORMAT:
    ```json
    (
        'answer': string
    )
    ```
    """
    prompt = PromptTemplate(
        input_variables=["human_input"], 
        template=template
    )
    
    llm_chain = LLMChain(
        llm=OpenAI(openai_api_key=OPENAI_KEY), 
        prompt=prompt, 
        verbose=False
    )
    
    result = llm_chain.predict(human_input=question)
    print(result)
    return result