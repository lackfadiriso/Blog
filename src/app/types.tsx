export interface Project {
    img: string,
    title:string,
    description: string
    navigate: string,
}

export interface About{
    certificates: string,
    my: string,
    about: string,
    date: string,
}

export interface MyCertificates{
    title: string,
    description: string,
    img: string,
    navigate: string
}

export interface ProjectsList {
    projectsItems: Project[],
    mainItems: Project[],
    aboutItems: About[],
    certificateItems: MyCertificates[],
    error: string | null,
    language: string,
}
