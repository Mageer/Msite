const duration = (time) => {
    seconds = time/1000
    minutes = Math.floor(seconds/60)
    seconds = Math.round(seconds - minutes*60)
    return {
        minutes,
        seconds,
        msg: `${minutes} minutes and ${seconds} seconds`
    }  
}

module.exports = duration



/**
 *  Looks like we can use
 * https://www.npmjs.com/package/date-and-time
 * instead of this custom library.
 */