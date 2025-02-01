export interface Launch {
    id: string
    name: string
    net: Date
}

export interface LaunchWithRelations {
    id: string
    name: string
    net: Date
    launchStatusId: number | null
    launchStatusName: string | null
    missionId: number | null
    missionName: string | null
    missionDescription: string | null
    imageId: number | null
    imageName: string | null
    imageUrl: string | null
}

export interface LaunchStatus {
    launchId: number
    statusId: number
}

export interface LaunchImage {
    launchId: number
    imageId: number
}

export interface LaunchMission {
    launchId: number
    missionId: number
}

export interface Results {
    results: Launch[]
}