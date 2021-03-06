export interface RecordType {
    mjd: number,
    xp: number,
    yp: number,
    lod: number,
    dut1: number
}

/**
 * Local variable holding Earth orientation parameters
 */
let eop: Array<RecordType> | undefined = undefined

/**
 * 
 * @returns Raw Earth orientation parameters array
 * 
 */
export const raw = (): Array<RecordType> | undefined => {
    return eop
}

/**
 * 
 * Return Earth orientation parmaeters for given date
 * 
 * @param d Date
 * @returns Earth orientation parameters at given date
 * 
 */
export const get = (d: Date): RecordType | undefined => {
    if (eop === undefined)
        return undefined

    let mjd = (d.valueOf() / 86400000) + 40587
    return eop.find((v) => v.mjd >= mjd)
}


/**
 * The URL where the Earth orientation parameters can be downloaded
 */
export const fileURL =
    'https://datacenter.iers.org/data/latestVersion/finals.all.iau2000.txt'


/**
 * 
 * @param raw Raw string containing contents of Earth orientation
 *            parmaters file 'finals.all.iau2000.txt'
 * @returns true on success, false on failure
 */
export const loadFromString = (raw: string): boolean => {
    eop = raw
        .split(/\r\n|\r|\n/)
        .filter((l) => {
            return (l.length > 70) ? true : false
        })
        .map((line) => {
            return {
                mjd: Number(line.slice(7, 15)),
                xp: Number(line.slice(18, 27)),
                yp: Number(line.slice(37, 46)),
                lod: Number(line.slice(79, 86)),
                dut1: Number(line.slice(58, 68))
            }
        })
        .filter((v) => {
            return (v.mjd >= 41684) ? true : false
        })
    return true
}

