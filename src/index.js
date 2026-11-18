const fs = require('fs')
const path = require('path')
const readline = require('readline')                                   

const { inputfile, outputfile, minage, cityfilter } = require('./config') 

const inputPath = path.resolve(process.cwd(), inputfile)

if (!fs.existsSync(inputPath)) {
    console.error(`Ошибка: входной файл не найден: ${inputPath}`)
    process.exit(1)                                                    
}

const readStream = fs.createReadStream(inputPath, {
    encoding: 'utf-8',
    highWaterMark: 200
})

const writeStream = fs.createWriteStream(path.resolve(process.cwd(), outputfile), {
    encoding: 'utf-8'
})

const rl = readline.createInterface({                                  
    input: readStream,
    crlfDelay: Infinity
})

let isFirstLine = true
let processedCount = 0
let filteredCount = 0

rl.on('line', (line) => {
    if (!line.trim()) return

    if (isFirstLine) {
        writeStream.write(line + '\n')
        isFirstLine = false
        return
    }

    processedCount++

    const [id, name, age, city] = line.split(',')
    const ageNum = Number(age)

    const ageOk  = ageNum >= minage
    const cityOk = !cityfilter || city === cityfilter

    if (ageOk && cityOk) {
        writeStream.write(line + '\n')
        filteredCount++
    }
})

readStream.on('open', () => {
    console.log('начинаем читать файл...')
})

readStream.on('error', (err) => {
    console.error('ошибка чтения:', err.message)
    process.exit(1)
})

rl.on('close', () => {
    writeStream.end()
})

writeStream.on('finish', () => {
    console.log('файл прочитан')
    console.log(`обработано строк: ${processedCount}`)
    console.log(`прошло фильтр:    ${filteredCount}`)
})

writeStream.on('error', (err) => {
    console.error('ошибка записи:', err.message)
    process.exit(1)
})