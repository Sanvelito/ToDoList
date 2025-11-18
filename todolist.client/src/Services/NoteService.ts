
import type CreateNoteRequset from "../Models/Note/CreateNoteRequset";
import type NoteResponse from "../Models/Note/NoteResponse";
import $api from "../http";

export async function CreateNewNote(req: CreateNoteRequset) {

        const response = await $api.post<NoteResponse>('/api/Note', req)
        console.log(response.data);
        return response.data;
}

export async function GetNotes(): Promise<NoteResponse[]> {

    const response = await $api.get<NoteResponse[]>('/api/Note')
    console.log(response.data);
    return response.data;
}

export async function UpdateNote(req: CreateNoteRequset, id: number): Promise<NoteResponse[]> {

    const response = await $api.put<NoteResponse[]>(`/api/Note/${id}`, req)
    console.log(response.data);
    return response.data;
}

export async function DeleteNote(id: number){

    const response = await $api.delete(`/api/Note/${id}`)
    console.log(response.data);
    return response.data;
}