import React from "react";
import { useNavigate } from "react-router-dom";
import { CreateNewNote, GetNotes } from "../Services/NoteService";
import { AxiosError } from "axios";
import type NoteResponse from "../Models/Note/NoteResponse";
import Note from "../Components/Note";

function MainPage() {

    const navigator = useNavigate();

    React.useEffect(() => {
        const init = async () => {

            if (!localStorage.getItem("accessToken")) {
                navigator("/login");
            }
            GetNotes().then(resp => {
                    setNotes(resp);
            }).catch(error => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    navigator("/login");
            });
        }
        init();
    }, [])

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [difficulty, setDifficulty] = React.useState("easy");
    const [status, setStatus] = React.useState("awaits");

    const [notes, setNotes] = React.useState<NoteResponse[]>([]);


    
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

    const onCreateNote = async (e: any) => {
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
            const response = await CreateNewNote({ name, description, difficulty, status })
            setNotes(prevNotes => [...prevNotes, response])
            setName("");
            setDescription("");
        }
        catch (error:any) {
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
    const NoteUpdate = (note: NoteResponse) => {
        console.log("update notes");
        setNotes(prevNotes => {
            prevNotes[prevNotes.findIndex(n => n.id == note.id)] = note;
            return [...prevNotes];
        })
    }
    const DeleteNoteUpdate = (id: number) => {
        console.log("update delete notes");
        setNotes(prevNotes => {
            const filteredNumbers = prevNotes.filter((i) => i.id !== id);
            return [...filteredNumbers];
        });
        
    }




    const inprogressNote = notes.filter(n => n.status == "inprogress").map(note =>
    (
        <Note note={note} key={note.id} onUpdate={NoteUpdate} delNote={DeleteNoteUpdate} />
    ));

    const awaitsNote = notes.filter(n => n.status == "awaits").map(note =>
    (
        <Note note={note} key={note.id} onUpdate={NoteUpdate} delNote={DeleteNoteUpdate} />
    ));

    const completedNote = notes.filter(n => n.status == "completed").map(note =>
    (
        <Note note={note} key={note.id} onUpdate={NoteUpdate} delNote={DeleteNoteUpdate} />
    ));
    

    return (
        <div className=" h-screen b bg-gradient-to-r from-violet-950 to-indigo-900" >
            <div className="flex justify-center text-2xl font-semibold italic text-center text-white p-3">
                Main page of
                <h2 className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block mx-2">
                    <span className="relative text-white mx-1">
                        ToDo
                    </span>
                </h2>
                client!
            </div>
            <div className="flex">

                <div className="flex basis-1/4 justify-center">
                        <div className="w-8/12 backdrop-blur-sm bg-white/10 rounded-xl drop-shadow-lg font-medium text-white mx-3 p-3 h-fit">
                            <form onSubmit={onCreateNote}>
                                <div className="flex justify-center text-xl font-semibold italic">
                                    Создание
                                    <span className="text-pink-500 ml-2">заметки
                                    </span>
                                </div>
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
                                <button type="submit" className="w-full p-2 rounded-xl font-medium text-white mt-5 bg-gradient-to-r from-violet-950 to-indigo-900 hover:from-violet-800 hover:to-indigo-800">Создать</button>
                                </div>
                            </form>
                        </div>
                </div>
                <div className="basis-1/4">
                    <div className="backdrop-blur-sm bg-white/10 rounded-xl drop-shadow-lg mx-1">
                        <div className="underline decoration-pink-500 text-xl font-semibold text-white italic pl-5 pt-3">
                        Ожидает
                        </div>
                        {awaitsNote}
                    </div>
                    
                </div>

                <div className="basis-1/4">
                    <div className="backdrop-blur-sm bg-white/10 rounded-xl drop-shadow-lg mx-1">
                        <div className="underline decoration-pink-500 text-xl font-semibold text-white italic pl-5 pt-3">
                            В работе
                        </div>
                        {inprogressNote}
                    </div>
                </div>

                <div className="basis-1/4">
                    <div className="backdrop-blur-sm bg-white/10 rounded-xl drop-shadow-lg mx-1">
                        <div className="underline decoration-pink-500 text-xl font-semibold text-white italic pl-5 pt-3">
                            Сделано :)
                        </div>
                        {completedNote}
                    </div>
                </div>
            </div>
            <div className="flex justify-center text-l font-semibold italic text-center text-white p-3">
            created by
                <h2 className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block mx-2">
                    <span className="relative text-white mx-1">
                        Sanvel
                    </span>
                </h2>
            </div>
        </div>
    
  );
}

export default MainPage;