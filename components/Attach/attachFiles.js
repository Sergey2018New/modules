/*
    ----------------
  |   ATTACH FILES   |
    ----------------

  *  Basic Attributes:
    * data-attach - File attachment element
    * data-attach-input - input[type="file"] element
    * data-attach-selected - selected file display element
*/

/**
  * Attach Files
  * @param  {Element} containerEl - HTML container element, document by default
*/
export default function attach(containerEl) {
    let attaches;

    if (containerEl) {
        if (containerEl instanceof Node) {
            attaches = containerEl.querySelectorAll('[data-attach]');
        }
    } else {
        attaches = document.querySelectorAll('[data-attach]');
    }

    if (attaches.length) {
        const attachMaxSize = 10 * 1024 * 1024;
        const fileExtension = ['doc', 'docx', 'pdf', 'jpg', 'jpeg'];
        const errorMessages = {
            ext: 'Файл не загружен. Допустимые типы файлов: DOC, DOCX, PDF, JPG',
            size: 'Файл не загружен. Максимальный размер файла — 10 Мб',
        };

        /**
            * Output of attached file
            * @param  {Element} attachFiles - HTML wrapper element for file output
            * @param  {File} file - file from input field
            * @param  {String} errorMsg - Error message
        */
        const renderFile = (attachFiles, file, errorMsg) => {
            const attachFilesCurrent = attachFiles;

            if (attachFilesCurrent) {
            attachFilesCurrent.insertAdjacentHTML('beforeend', `<div class="ui-attach__file" data-attach-file data-id="${file.lastModified}" data-name="${file.name}">
                <div class="ui-attach__file-box">
                <svg class="ui-attach__file-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.38668 0V5.59371H2.79297V21.6C2.79297 22.9255 3.86749 24 5.19297 24H18.8069C20.1323 24 21.2069 22.9255 21.2069 21.6V2.4C21.2069 1.07452 20.1323 0 18.8069 0H8.38668ZM15.3287 15.0773C15.3401 16.8548 13.1323 17.7689 11.8872 16.5026C11.5065 16.1218 11.2967 15.6155 11.2968 15.077L11.2972 11.3255L12.7034 11.3257L12.703 15.0772C12.7337 15.8853 13.8905 15.8857 13.9224 15.0773V10.7162C13.8231 8.10706 10.0829 8.10908 9.98447 10.7162V16.0619C9.98447 17.1476 10.8677 18.0308 11.9534 18.0308H13.3127V19.4371H11.9534C10.0923 19.4371 8.57821 17.923 8.57821 16.0619V10.7162C8.74842 6.24359 15.16 6.24701 15.3287 10.7162V15.0773Z" fill="#2A2623"></path>
                    <path d="M6.98063 0.412109L3.20508 4.18766H6.98063V0.412109Z" fill="#2A2623"></path>
                </svg>
                <div class="ui-attach__file-name">${file.name}</div>
                <button type="button" class="ui-attach__file-remove" title="Удалить" aria-label="Удалить"
                data-attach-remove></button>
                </div>
                ${errorMsg ? `<div class="ui-attach__file-error">${errorMsg}</div>` : ''}
                </div>`);
            }
        };

        /**
            * Remove file from file list
            * @param  {Element} inputEl - input[type="file"] element
            * @param  {Number} removeId - file id
            * @param  {String} fileName - file Name
        */
        const removeFileFromFileList = (inputEl, removeId, fileName) => {
            const dt = new DataTransfer();
            const input = inputEl;
            const { files } = input;

            for (let i = 0; i < files.length; i += 1) {
            const file = files[i];

            if (file.lastModified !== parseInt(removeId, 10) && file.name !== fileName) {
                dt.items.add(file);
            }
            }

            input.files = dt.files;
        };

        /**
            * Get a new list of files
            * @param  {Element} input - input[type="file"] element
        */
        const getNewFileList = (input) => {
            const dt = new DataTransfer();
            const { files } = input;

            for (let i = 0; i < files.length; i += 1) {
                const file = files[i];
                dt.items.add(file);
            }

            return dt;
        };

        attaches.forEach((attachItem) => {
            const attachInput = attachItem.querySelector('[data-attach-input]');
            const attachFiles = attachItem.querySelector('[data-attach-files]');
            let uploadedFiles = new DataTransfer();

            attachItem.addEventListener('change', (event) => {
                const { target } = event;

                if (target.hasAttribute('data-attach-input')) {
                    const filesNew = target.files;
                    let isCheckExtension;

                    if (typeof filesNew !== 'undefined') {
                        for (let i = 0; i < filesNew.length; i += 1) {
                            const fileNew = filesNew[i];

                            const { name: fileName } = fileNew;
                            const { size: fileSize } = fileNew;
                            const sizeErrorMsg = fileSize > attachMaxSize ? errorMessages.size : '';

                            isCheckExtension = false;

                            for (let j = 0; j < fileExtension.length; j += 1) {
                                if (fileExtension[j] === fileName.split('.').splice(-1, 1)[0]) {
                                    isCheckExtension = true;
                                    break;
                                }
                            }

                            if (isCheckExtension) {
                                if (fileSize <= attachMaxSize) {
                                    uploadedFiles.items.add(fileNew);
                                }
                            }

                            renderFile(attachFiles, fileNew, !isCheckExtension ? errorMessages.ext : sizeErrorMsg);
                        }
                    }

                    target.files = uploadedFiles.files;
                }
            });

            attachItem.addEventListener('click', (event) => {
                const { target } = event;

                if (target.closest('[data-attach-remove]') || target.hasAttribute('data-attach-remove')) {
                    const targetFile = target.closest('[data-attach-file]');
                    const fileId = targetFile.getAttribute('data-id');
                    const fileName = targetFile.getAttribute('data-name');

                    removeFileFromFileList(attachInput, fileId, fileName);

                    uploadedFiles = getNewFileList(attachInput);

                    targetFile.remove();
                }
            });
        });
    }
}
