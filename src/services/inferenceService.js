const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeImage(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const label = score > 0.5 ? 'Cancer' : 'Non-cancer';
        let suggestion;
        if (label === 'Cancer') {
            suggestion = "Segera periksa ke dokter!"
        }
        if (label === 'Non-cancer') {
            suggestion = "Tetap terapkan pola hidup sehat!"
        }
        return { label, suggestion };
    } catch (error) {
        throw new InputError(`${error.message}`)
    }
}

module.exports = predictClassification;