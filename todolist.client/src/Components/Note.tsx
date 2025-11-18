import { AxiosError } from "axios";
import React from "react";
import { UpdateNote, DeleteNote } from "../Services/NoteService";

function Note(props: any) {
    var statusMap = new Map([
        ["awaits", "text-neutral-400"],
        ["inprogress", "text-neutral-400"],
        ["completed", "text-neutral-400"]
    ]); 

    var difficultyMap = new Map([
        ["easy", "bg-green-500 "],
        ["medium", "bg-yellow-400 "],
        ["hard", "bg-red-500 "]
    ]); 

    const [isInEditMode, setIsInEditMode] = React.useState(false);
    const [name, setName] = React.useState(props.note.name);
    const [description, setDescription] = React.useState(props.note.description);
    const [difficulty, setDifficulty] = React.useState(props.note.difficulty);
    const [status, setStatus] = React.useState(props.note.status);

    const [createError, setCreateError] = React.useState("");

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    }
    const handledDscriptionChange = (e: any) => {
        setDescription(e.target.value);
    }
    const handledDifficultyChange = (e: any) => {
        setDifficulty(e.target.value);
    }
    const handledStatusChange = (e: any) => {
        setStatus(e.target.value);
    }
    const onUpdateNote = async (e: any) => {
        e.preventDefault();
        if (!name) {
            console.log("name is null")
            return false;
        }
        if (name.length < 4) {
            console.log("name lenght < 4");
            return false;
        }
        try {
            const response = await UpdateNote({ name, description, difficulty, status }, props.note.id)
            props.onUpdate(response);
            setIsInEditMode(false);
        }
        catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    setCreateError(error.response.data.title);
                    return;
                }
                setCreateError(error.message);
            }
        }
        console.log(name, description, difficulty, status)
    }
    const deleteNote = async (e: any) => {
        try {
            await DeleteNote(props.note.id)
            props.delNote(props.note.id);
            setIsInEditMode(false);
        }
        catch (error: any) {
            if (error instanceof AxiosError) {
                if (error.response) {
                    setCreateError(error.response.data.title);
                    return;
                }
                setCreateError(error.message);
            }
        }
    }


    return (
        <div className="m-3 p-3 rounded-xl bg-violet-700">
            {isInEditMode
                ? <div className=" rounded-xl drop-shadow-lg font-medium text-white mx-3 p-3 h-fit">
                    <div className="mt-2">Название</div>
                    <input type="text" value={name} onChange={handleNameChange} className="w-full rounded-sm bg-gradient-to-r from-violet-950 to-indigo-900 focus:from-violet-800 focus:to-indigo-800 ring-2 ring-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"></input>

                    <div className="mt-2">Описание*</div>
                    <input type="text" value={description} onChange={handledDscriptionChange} className="w-full rounded-sm bg-gradient-to-r from-violet-950 to-indigo-900 focus:from-violet-800 focus:to-indigo-800 ring-2 ring-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"></input>


                    <div className="mt-2">Сложность</div>
                    <select value={difficulty} onChange={handledDifficultyChange} className="w-full bg-violet-800 rounded-sm bg-gradient-to-r from-violet-950 to-indigo-900 focus:from-violet-800 focus:to-indigo-800 ring-2 ring-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                        <option value={"easy"} className="text-white font-semibold">легко</option>
                        <option value={"medium"} className="text-white font-semibold">нормально</option>
                        <option value={"hard"} className="text-white font-semibold">сложно</option>
                    </select>

                    <div className="mt-2">Статус</div>
                    <select value={status} onChange={handledStatusChange} className="w-full rounded-sm bg-violet-800 bg-gradient-to-r from-violet-950 to-indigo-900 focus:from-violet-800 focus:to-indigo-800 ring-2 ring-white focus:outline-none focus:ring-2 focus:ring-pink-500">
                        <option value={"awaits"} className="text-white font-semibold">ожидает</option>
                        <option value={"inprogress"} className="text-white font-semibold">в работе</option>
                        <option value={"completed"} className="text-white font-semibold">сделано</option>
                    </select>
                    <div className="flex justify-center">
                        <button onClick={onUpdateNote} className="w-3/5 p-2 rounded-xl font-medium text-white mt-5 bg-gradient-to-r from-violet-950 to-indigo-900 hover:from-violet-800 hover:to-indigo-800">Обновить</button>
                        <button onClick={deleteNote} className="w-1/5 p-2 rounded-xl font-medium text-white mt-5 bg-gradient-to-r from-violet-950 to-indigo-900 hover:from-violet-800 hover:to-indigo-800">Удалить</button>
                        <button onClick={() => setIsInEditMode(false)} className="w-1/5 p-2 rounded-xl font-medium text-white mt-5 bg-gradient-to-r from-violet-950 to-indigo-900 hover:from-violet-800 hover:to-indigo-800">X</button>
                    </div>
                </div>

                : <div className="flex flex-row">
                    <div className="basis-10/12">
                        <div className="text-white font-semibold text-xl">{props.note.name}</div>
                        <div className="text-white text-lg">{props.note.description}</div>
                        <div className={statusMap.get(props.note.status)}>{props.note.status}</div>
                        <div>
                            <span className={difficultyMap.get(props.note.difficulty) + "text-lg text-white rounded-sm px-1 font-medium"}>{props.note.difficulty}</span>
                        </div>
                    </div>
                    <button onClick={() => setIsInEditMode(true)} className="basis-2/12 rounded-xl font-medium text-white bg-gradient-to-r from-violet-800 to-indigo-700 hover:from-violet-800 hover:to-indigo-800">Edit.</button>
                </div>
                
            }          
      </div>
  );
}

export default Note;