export function prettyTime(time_msec) {
    // const msec = time_msec % 1000
    // const time_sec = (time_msec - msec) / 1000
    // const sec = time_sec % 60
    // const secStr = (sec + msec / 1000).toFixed(1)
    // const time_min = (time_sec-sec) / 60
    // const min = time_min % 60
    // const hr = (time_min-min) / 60

    // const str = 
    //     hr ? `${hr}:` : ''
    //     + min.toString().padStart(2, '0') + ':'
    //     + secStr.padStart(4, '0')
    // console.log(time_msec, str)


    const secStr= (time_msec / 1000).toFixed(1)
    const sec = Math.floor(time_msec / 1000)
    const min = Math.floor(sec / 60)
    const hr = Math.floor(min / 60)

    const str = 
        hr ? `${hr}:` : ''
        + min.toString().padStart(2, '0') + ':'
        + secStr.padStart(4, '0')

    // if (hr > 0) time.push(hr)
    // time.push(min % 60)
    // time.push(sec % 60)
    // const str =  time.map(t => t.toString().padStart(2, '0')).join(':')
    console.log(time_msec, str)
    return str
}


[0, 1, 59, 60, 61, 119, 120, 121, 890, 900, 940, 950, 960, 1000, 1049, 1050, 1080, 3599, 3600, 3601, 7199, 7200, 7201, 359999, 360000, 360001].forEach(prettyTime)

