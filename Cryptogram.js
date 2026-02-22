// Cryptogram.js

let TREASURE_PLANET_TEXT = '';

// Load the treasure planet text from the file
async function loadTreasurePlanetText() {
    try {
        const response = await fetch('CryptogramFiles/TreasurePlanet.txt');
        TREASURE_PLANET_TEXT = await response.text();
    } catch (error) {
        console.error('Error loading Treasure Planet text:', error);
    }
}

class Cryptogram {
    constructor() {
        this.originalText = '';
        this.encryptedText = '';
        this.cipherKey = {};
        this.reverseCipherKey = {};
        this.userSolution = {};
        this.hintsUsed = 0;
        this.usedLetters = new Set();

        this.init();
    }

    init() {
        this.generateNewCryptogram();
        this.setupEventListeners();
        this.render();
    }

    extractRandomLines() {
        const sentences = TREASURE_PLANET_TEXT.split(/(?<=[.!?])\s+/);
        const lineCount = Math.floor(Math.random() * 3) + 5; // 5-7 lines
        const startIdx = Math.floor(Math.random() * (sentences.length - lineCount));
        const selectedSentences = sentences.slice(startIdx, startIdx + lineCount);
        return selectedSentences.join(' ').trim();
    }

    generateNewCryptogram() {
        this.originalText = this.extractRandomLines();
        this.cipherKey = this.createSubstitutionCipher();
        this.reverseCipherKey = this.createReverseKey();
        this.encryptedText = this.encrypt();
        this.userSolution = {};
        this.hintsUsed = 0;
        this.usedLetters = new Set();
    }

    createSubstitutionCipher() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        let shuffled = [...alphabet]; // Copy the array
        
        // Keep shuffling until no letter maps to itself (derangement)
        let hasMapping = true;
        while (hasMapping) {
            // Fisher-Yates shuffle for proper randomization
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            
            // Check if any letter maps to itself
            hasMapping = false;
            for (let i = 0; i < alphabet.length; i++) {
                if (alphabet[i] === shuffled[i]) {
                    hasMapping = true;
                    break;
                }
            }
        }
        
        const cipher = {};
        alphabet.forEach((letter, index) => {
            cipher[letter] = shuffled[index];
        });

        return cipher;
    }

    createReverseKey() {
        const reverse = {};
        Object.keys(this.cipherKey).forEach(key => {
            reverse[this.cipherKey[key]] = key;
        });
        return reverse;
    }

    encrypt() {
        return this.originalText
            .split('')
            .map(char => {
                const upper = char.toUpperCase();
                if (this.cipherKey[upper]) {
                    return this.cipherKey[upper];
                }
                return char;
            })
            .join('');
    }

    decrypt() {
        const wordRegex = /[A-Z']+|[.!?,\-—]/g;
        const words = this.encryptedText.match(wordRegex) || [];
        return words;
    }

    getSolutionForWord(word) {
        let solution = '';
        for (let char of word) {
            if (/[A-Z]/.test(char)) {
                solution += this.userSolution[char] || '_';
            } else {
                solution += char;
            }
        }
        return solution;
    }

    renderStackedDisplay() {
        const display = document.getElementById('cryptogramDisplay');
        display.innerHTML = '';
        
        const words = this.decrypt();
        let lastWordContainer = null;
        
        words.forEach(word => {
            // Check if this is just punctuation
            if (/^[.!?]+$/.test(word)) {
                // Append to previous word's both solution and encrypted sections if it exists
                if (lastWordContainer) {
                    const solutionDiv = lastWordContainer.querySelector('.word-solution');
                    const encryptedDiv = lastWordContainer.querySelector('.word-encrypted');
                    solutionDiv.textContent += word;
                    encryptedDiv.textContent += word;
                }
                return;
            }
            
            // Create container for word pair
            const wordContainer = document.createElement('div');
            wordContainer.className = 'word-stack';
            
            // Solution (top)
            const solutionDiv = document.createElement('div');
            solutionDiv.className = 'word-solution';
            solutionDiv.textContent = this.getSolutionForWord(word);
            
            // Encrypted (bottom)
            const encryptedDiv = document.createElement('div');
            encryptedDiv.className = 'word-encrypted';
            encryptedDiv.textContent = word;
            
            wordContainer.appendChild(solutionDiv);
            wordContainer.appendChild(encryptedDiv);
            display.appendChild(wordContainer);
            lastWordContainer = wordContainer;
        });
    }

    setupEventListeners() {
        document.getElementById('verifyBtn').addEventListener('click', () => this.verify());
        document.getElementById('newCryptogramBtn').addEventListener('click', () => {
            this.generateNewCryptogram();
            this.render();
        });
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.userSolution = {};
            this.hintsUsed = 0;
            this.render();
        });
        document.getElementById('hintBtn').addEventListener('click', () => this.giveHint());
    }

    setupCipherInputs() {
        const inputs = document.querySelectorAll('.decrypted-input');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.toUpperCase();
                if (value.length > 1) {
                    value = value.slice(-1);
                }

                const encryptedLetter = input.dataset.encrypted;
                if (value && /^[A-Z]$/.test(value)) {
                    this.userSolution[encryptedLetter] = value;
                    this.updateUserDisplay();
                } else if (value === '') {
                    delete this.userSolution[encryptedLetter];
                    this.updateUserDisplay();
                } else {
                    e.target.value = input.dataset.value || '';
                }

                input.dataset.value = e.target.value;
                this.updateStats();
            });
        });
    }

    updateUserDisplay() {
        this.renderStackedDisplay();
    }

    updateStats() {
        const uniqueEncryptedLetters = new Set(
            this.encryptedText.match(/[A-Z]/gi) || []
        ).size;
        const solvedCount = Object.keys(this.userSolution).length;
        document.getElementById('letterCount').textContent = solvedCount;
        document.getElementById('totalLetters').textContent = uniqueEncryptedLetters;
        document.getElementById('hintsUsed').textContent = this.hintsUsed;
    }

    giveHint() {
        // Find an encrypted letter that hasn't been solved yet
        const unsolved = Array.from(
            new Set(this.encryptedText.match(/[A-Z]/gi))
        ).filter(letter => !(letter in this.userSolution));

        if (unsolved.length === 0) {
            this.showFeedback('All letters are already solved!', 'info');
            return;
        }

        const randomLetter = unsolved[Math.floor(Math.random() * unsolved.length)];
        this.userSolution[randomLetter] = this.reverseCipherKey[randomLetter];
        this.hintsUsed++;

        // Update the input
        const input = document.querySelector(`[data-encrypted="${randomLetter}"]`);
        if (input) {
            input.value = this.reverseCipherKey[randomLetter];
            input.dataset.value = this.reverseCipherKey[randomLetter];
        }

        this.updateUserDisplay();
        this.updateStats();
        this.showFeedback(`Hint given! ${randomLetter} = ${this.reverseCipherKey[randomLetter]}`, 'info');
    }

    verify() {
        // Reconstruct the full decrypted text from the encrypted text
        let decryptedText = '';
        let wordIndex = 0;
        const words = this.decrypt();
        
        for (let i = 0; i < this.encryptedText.length; i++) {
            const char = this.encryptedText[i];
            const upper = char.toUpperCase();
            
            if (/[A-Z]/.test(upper)) {
                const decrypted = this.userSolution[upper];
                if (decrypted) {
                    decryptedText += decrypted;
                } else {
                    // Not all letters solved
                    this.showFeedback('Not quite right. Keep trying!', 'error');
                    return;
                }
            } else {
                // Space, punctuation, or other character
                decryptedText += char;
            }
        }
        
        if (decryptedText.toLowerCase() === this.originalText.toLowerCase()) {
            this.showFeedback('🎉 Correct! You solved the cryptogram!', 'success');
            document.getElementById('verifyBtn').disabled = true;
        } else {
            this.showFeedback('Not quite right. Keep trying!', 'error');
        }
    }

    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback show ${type}`;
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 4000);
    }

    render() {
        this.renderCryptogram();
        this.renderCipherKey();
        this.updateUserDisplay();
        this.updateStats();

        // Reset buttons
        document.getElementById('verifyBtn').disabled = false;
    }

    renderCryptogram() {
        this.renderStackedDisplay();
    }

    renderCipherKey() {
        const cipherSection = document.getElementById('cipherKey');
        cipherSection.innerHTML = '';

        const uniqueLetters = Array.from(new Set(
            this.encryptedText.match(/[A-Z]/gi) || []
        )).sort();

        uniqueLetters.forEach(encryptedLetter => {
            const div = document.createElement('div');
            div.className = 'letter-mapping';

            const encrypted = document.createElement('span');
            encrypted.className = 'encrypted-letter';
            encrypted.textContent = encryptedLetter;

            const arrow = document.createElement('span');
            arrow.className = 'arrow';
            arrow.textContent = '→';

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'decrypted-input';
            input.placeholder = '?';
            input.dataset.encrypted = encryptedLetter;
            input.maxLength = 1;

            if (encryptedLetter in this.userSolution) {
                input.value = this.userSolution[encryptedLetter];
                input.dataset.value = this.userSolution[encryptedLetter];

                if (this.userSolution[encryptedLetter] === this.reverseCipherKey[encryptedLetter]) {
                    input.classList.add('correct');
                } else {
                    input.classList.add('incorrect');
                }
            }

            div.appendChild(encrypted);
            div.appendChild(arrow);
            div.appendChild(input);
            cipherSection.appendChild(div);
        });

        this.setupCipherInputs();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    await loadTreasurePlanetText();
    new Cryptogram();
});
