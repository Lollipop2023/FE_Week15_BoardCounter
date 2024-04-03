/*For the short time I had: I tried to use state in react, I again have failed.
hope to have a mentor session to have someone walk me through these. Due to 
time constraints I am basically trying to adapt snippets others have created
to make them do what I need them to do. I have found that in my maybe 10 hours
a week I am managing I begin to lose track of what I am coding. I expect someday
I will find I simply left a whole bunch of code out. I still don't think in small
steps, everything in my brain is lumped together.*/
import './App.css';
import React, { useState, useEffect } from 'react';

const MockAPI = 'https://66093cda0f324a9a2882f63c.mockapi.io/BoardCountAPI/:endpoint';

function App() {
    const [boards, setBoards] = useState([]);
    const [goodCount, setGoodCount] = useState(0);
    const [badCount, setBadCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        fetch(MockAPI)
            .then(response => response.json())
            .then(data => {
                setBoards(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const incrementGood = () => {
        setGoodCount(prevCount => prevCount + 1);
        setTotalCount(prevCount => prevCount + 1);
        setBoards(prevBoards => [...prevBoards, { type: 'Good' }]);
    };

    const incrementBad = () => {
        setBadCount(prevCount => prevCount + 1);
        setTotalCount(prevCount => prevCount + 1);
        setBoards(prevBoards => [...prevBoards, { type: 'Bad' }]);
    };

    const deleteBoard = (index) => {
        const updatedBoards = [...boards];
        updatedBoards.splice(index, 1);
        setBoards(updatedBoards);
        setTotalCount(prevCount => prevCount - 1);
        if (updatedBoards[index].type === 'Good') {
            setGoodCount(prevCount => prevCount - 1);
        } else {
            setBadCount(prevCount => prevCount - 1);
        }
    };

    const renderBoards = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Board Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board, index) => (
                        <tr key={index}>
                            <td>{board.type}</td>
                            <td>
                                <button onClick={() => updateBoard(index)}>Update</button>
                                <button onClick={() => deleteBoard(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const updateBoard = (index) => {
        const updatedBoards = [...boards];
      };

    return (
        <div>
            <h2>Board Counter</h2>
            <div>
                <button onClick={incrementGood}>Good Board</button>
                <span>{goodCount} Good Boards</span>
            </div>
            <div>
                <button onClick={incrementBad}>Bad Board</button>
                <span>{badCount} Bad Boards</span>
            </div>
            <div>
                <span>{totalCount} Total Boards</span>
            </div>
            <br />
            {loading ? <p>Loading...</p> : renderBoards()}
        </div>
    );
}

export default App;
