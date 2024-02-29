from .utils import OpenAIChatCompletion


def get_chat(question):
    return OpenAIChatCompletion(question)