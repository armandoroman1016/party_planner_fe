import React from "react";
import { connect } from "react-redux";

function ReadPartyStatus(prop) {
    const { targetObject } = prop;

    const targetObjectShopList = prop.shoppingListItems.filter(
        (item) =>
            item.shopping_list_id === targetObject.id &&
            (item.purchased === true || item.purchased === 1)
    );
    const targetObjectEntList = prop.entertainmentList.filter(
        (item) => item.todo_list_id === targetObject.id
    );
    const targetObjectTodoList = prop.todoItems.filter(
        (item) => item.todo_list_id === targetObject.id
    );

    let toDoListRemaining =
        targetObjectTodoList.filter(
            (todo) => todo.completed === false || todo.completed === 0
        ).length + 1;
    if (toDoListRemaining === 1) {
        toDoListRemaining = 0;
    }
    const totalShopping = targetObjectShopList.reduce((acc, item) => {
        acc += item.price;
        return acc;
    }, 0);

    const totalEntertainment = targetObjectEntList.reduce((acc, item) => {
        acc += item.price;
        return acc;
    }, 0);

    const totalSpent = totalEntertainment + totalShopping;

    let statusResponse = "";

    const amountOver = totalSpent - targetObject.budget;

    let remainingBudget = targetObject.budget - totalSpent;

    if (toDoListRemaining < 0) {
        toDoListRemaining = 0;
    }

    if (totalSpent > targetObject.budget) {
        statusResponse = `You are currently ${amountOver} dollars over your budget. You have ${toDoListRemaining} items remaining in your to do list.`;
    } else {
        statusResponse = `You are currently ${remainingBudget} dollars under your budget. You have ${toDoListRemaining} items remaining in your to do list.`;
    }

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    let transcript = "";

    recognition.onresult = (e) => {
        const current = e.resultIndex;
        transcript = e.results[current][0].transcript;
        readResults(transcript);
    };

    const readResults = (message) => {
        const speech = new SpeechSynthesisUtterance();

        speech.text = "I dont quite understand";

        if (
            message.includes("how" && ("party" || "event")) ||
            message.includes("what" && ("party" || "event"))
        ) {
            speech.text = statusResponse;
        }
        speech.volume = 1;
        speech.rate = 0.8;
        speech.pitch = 0.3;
        window.speechSynthesis.speak(speech);
    };

    return (
        <div>
            <button
                onClick={() => recognition.start()}
                style={{
                    backgroundColor: "#073c8a",
                    border: "none",
                    padding: "10px 0",
                    color: "#ffffff",
                    width: "25%",
                    borderRadius: "10px",
                    cursor: "pointer",
                }}
            >
                Ask
            </button>
            <h4 style={{ marginBottom: "15px" }}>
                {transcript
                    ? `${statusResponse}`
                    : "Say... Whats The Status Of My Party"}
            </h4>
        </div>
    );
}

const mapStateToProp = (state) => {
    return {
        shoppingListItems: state.shoppingListItems,
        entertainmentList: state.entertainmentList,
        todoItems: state.todoItems,
    };
};

export default connect(mapStateToProp, {})(ReadPartyStatus);
