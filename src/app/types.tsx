export interface Project {
    img: string,
    title:string,
    description: string
    navigate: string,
}

export interface About{
    my: string,
    about: string,
    date: string,
}

export interface MyCertificates{
    title: string,
    img: string,
    link: string
}

export interface ProjectsList {
    projectsItems: Project[],
    mainItems: Project[],
    aboutItems: About[],
    certificateItems: MyCertificates[],
    error: string | null,
    language: string,
}