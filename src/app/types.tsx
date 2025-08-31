export interface Project {
    img: string,
    title:string,
    description: string
    navigate: string,
}

export interface About{
    certificate: string,
    my: string,
    about: string,
    date: string,
}

export interface ProjectsList {
    projectsItems: Project[],
    mainItems: Project[],
    aboutItems: About[],
    error: string | null,
    language: string,
}