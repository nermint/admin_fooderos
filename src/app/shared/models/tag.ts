

export interface ITag{
    id: number;
    tag_type_id: number;
    store_type_id: number;
    media: Media;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    applied_branches_count: number;
    tag_type: Tagtype;
    locales: Locale[];
}

export interface Media{
    name: string;
    path: string;
}

export interface Tagtype{
    id: number;
    name: string;
}

export interface Locale{
    title: string;
    locale: string;
}

export interface Tagtype{
    id: number;
    name: string;
}
