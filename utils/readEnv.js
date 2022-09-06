require("dotenv").config()

class ReadEnv {
    get(envKey) {
        let envValue = process.env[envKey]
        if (!envValue) {
            throw new Error(`${envKey} dont have value. Please update your .env to include ${envKey}`)
        }

        return envValue
    }
}

module.exports.ReadEnv = ReadEnv