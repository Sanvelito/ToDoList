export default interface NoteResponse {
    id: number;
    name: string;
    description?: string;
    difficulty: string;
    status: string;
    userId: number;
}