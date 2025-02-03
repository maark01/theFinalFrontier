export interface Launch {
    id: string
    name: string
    net: string
}

export interface LaunchWithRelations {
    id: string
    name: string
    net: string
    statusId: number | null
    statusName: string | null
    imageId: number | null
    imageName: string | null
    imageUrl: string | null
    missionId: number | null
    missionName: string | null
    missionType: string | null
    missionDescription: string | null
}

export interface LaunchStatus {
    launchId: string
    statusId: number
}

export interface LaunchImage {
    launchId: string
    imageId: number
}

export interface LaunchMission {
    launchId: string
    missionId: number
}

export interface Results {
    results: Launch[]
}