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
export default function initAttach(containerEl) {
    let attaches;

    if (containerEl) {
        if (containerEl instanceof Node) {
            attaches = containerEl.querySelectorAll('[data-attach]');
        }
    } else {
        attaches = document.querySelectorAll('[data-attach]');
    }

    if (attaches.length) {
        const MAX_SIZE = 10; // size in megabytes
        const MAX_FILES = 10; // maximum number of uploaded files
        const ERROR_MESSAGES = {
            extension: 'Acceptable file types: DOC, DOCX, JPG, XLS, XLSX, PNG, JPG, GIF',
            maxSize: 'Maximum file size: 10 MB',
        };
        const EXTENSIONS = ['doc', 'docx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'gif'];

        /**
            * Output of attached file
            * @param  {Element} attachItem - HTML element attach
            * @param  {Element} attachFiles - HTML wrapper element for file output
            * @param  {File} file - file from input field
            * @param  {String} errorMsg - Error message
        */
        const renderFile = (attachType, attachItem, attachFiles, file, errorMsg) => {
            const attachFilesCurrent = attachFiles;
            const fileErrorEl = attachItem.querySelector('[data-attach-message-error]');
            let fileItemHtml = '';
            let fileErrorMessage = errorMsg ? `<div class="ui-attach__message-error" data-attach-message-error>${errorMsg}</div>` : '';
            const isExtPictures = /\.(jpe?g|png|gif)$/i.test(file.name);

            if (fileErrorEl) {
                fileErrorEl.remove();
            }

            if (fileErrorMessage) {
                attachItem.insertAdjacentHTML('beforeend', fileErrorMessage);
            } else if (attachFilesCurrent) {
                if (attachType === 'pictures') {
                    if (isExtPictures) {
                        const reader = new FileReader();
                        const maxWidth = 64;

                        reader.onload = function (r) {
                            const tempImg = new Image();
                            tempImg.src = reader.result;

                            tempImg.onload = function() {
                                const tempScale = tempImg.width / tempImg.height;
                                let tempW = tempImg.width;
                                let tempH = tempImg.height;

                                if (tempScale > 1) {
                                    tempW = maxWidth * tempScale;
                                    tempH = maxWidth;
                                } else if (tempScale < 1) {
                                    tempW = maxWidth;
                                    tempH = maxWidth / tempScale;
                                }

                                tempW = Math.round(tempW);
                                tempH = Math.round(tempH);

                                const canvas = document.createElement('canvas');
                                canvas.width = tempW;
                                canvas.height = tempH;

                                const ctx = canvas.getContext("2d");
                                ctx.drawImage(this, 0, 0, tempW, tempH);

                                const dataURL = canvas.toDataURL();

                                fileItemHtml = `<div class="ui-attach__file" data-attach-file data-id="${file.lastModified}" data-name="${file.name}">
                                    <div class="ui-attach__file-box">
                                        <img class="ui-attach__file-image" src="${dataURL}" width="64" height="64" alt=""/>
                                        <button type="button" class="ui-attach__file-remove" title="Удалить" aria-label="Удалить"
                                        data-attach-remove></button>
                                    </div>
                                </div>`;

                                attachFilesCurrent.insertAdjacentHTML('beforeend', fileItemHtml);
                            }
                        };

                        reader.readAsDataURL(file);
                    }
                } else {
                    fileItemHtml = `<div class="ui-attach__file" data-attach-file data-id="${file.lastModified}" data-name="${file.name}">
                    <div class="ui-attach__file-box">
                    <span class="ui-attach__file-icon"></span>
                    <div class="ui-attach__file-name">${file.name}</div>
                    <button type="button" class="ui-attach__file-remove" title="Удалить" aria-label="Удалить"
                    data-attach-remove></button>
                    </div>
                    </div>`;

                    attachFilesCurrent.insertAdjacentHTML('beforeend', fileItemHtml);
                }
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

        /**
            *
        */
        const isAdvancedUpload = function() {
            const span = document.createElement('span');
            return (('draggable' in span) || ('ondragstart' in span && 'ondrop' in span)) && 'FormData' in window && 'FileReader' in window;
        }();

        attaches.forEach((attachItem) => {
            const attachType = attachItem.getAttribute('data-type');
            const attachInput = attachItem.querySelector('[data-attach-input]');
            const attachFiles = attachType === 'pictures' ? attachItem : attachItem.querySelector('[data-attach-files]');
            let uploadedFiles = new DataTransfer();

            if (attachInput) {
                const attachMessageExtension = attachInput.getAttribute('data-message-extension') || ERROR_MESSAGES.extension;
                const attachMessageMaxSize = attachInput.getAttribute('data-message-max-size') || ERROR_MESSAGES.maxSize;
                const attachMaxFiles = attachInput.getAttribute('data-max-files') || MAX_FILES;
                let attachMaxSize = attachInput.getAttribute('data-max-size') || MAX_SIZE;
                let attachExtensions = attachInput.getAttribute('accept');

                const isCheckMaxFiles = () => {
                    return uploadedFiles.files.length < Number(attachMaxFiles);
                };

                const uploadFiles = (filesNew) => {
                    let isCheckExtension;

                    if (typeof filesNew !== 'undefined') {
                        for (let i = 0; i < filesNew.length; i += 1) {
                            const fileNew = filesNew[i];
                            const { name: fileName } = fileNew;
                            const { size: fileSize } = fileNew;
                            const sizeErrorMsg = fileSize > attachMaxSize * 1024 * 1024 ? attachMessageMaxSize : '';

                            isCheckExtension = false;

                            for (let j = 0; j < attachExtensions.length; j += 1) {
                                if (attachExtensions[j] === fileName.split('.').splice(-1, 1)[0]) {
                                    isCheckExtension = true;
                                    break;
                                }
                            }

                            if (isCheckMaxFiles()) {
                                if (isCheckExtension && fileSize <= attachMaxSize * 1024 * 1024) {
                                    if (uploadedFiles.items.length <= Number(attachMaxFiles)) {
                                        uploadedFiles.items.add(fileNew);
                                    }
                                }

                                renderFile(attachType, attachItem, attachFiles, fileNew, !isCheckExtension ? attachMessageExtension : sizeErrorMsg);
                            }
                        }

                        if (!isCheckMaxFiles()) {
                            attachItem.classList.add('is-max-files');
                        } else {
                            attachInput.files = uploadedFiles.files;
                        }
                    }
                }

                if (attachExtensions) {
                    attachExtensions = attachExtensions.split(',');

                    for (let i = 0; i < attachExtensions.length; i++) {
                        const attachExtension = attachExtensions[i];
                        attachExtensions[i] = attachExtension.split('.').splice(-1, 1)[0];
                    }
                } else {
                    attachExtensions = EXTENSIONS;
                }

                attachInput.addEventListener('change', (event) => {
                    uploadFiles(event.target.files);
                });

                if (isAdvancedUpload) {
                    const dragArea = attachItem.querySelector('[data-attach-drag-area]');

                    if (dragArea) {
                        let droppedFiles = false;
                        attachItem.classList.add('is-draggable');

                        ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach(function(i) {
                            dragArea.addEventListener(i, (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            });
                        });

                        ['dragenter', 'dragover'].forEach(function(i) {
                            dragArea.addEventListener(i, (e) => {
                                attachItem.classList.add('is-dragover');
                            });
                        });

                        ['dragleave', 'dragend', 'drop'].forEach(function(i) {
                            dragArea.addEventListener(i, (e) => {
                                attachItem.classList.remove('is-dragover');
                            });
                        });

                        dragArea.addEventListener('drop', (e) => {
                            droppedFiles = e.dataTransfer.files;

                            if (droppedFiles.length) {
                                uploadFiles(droppedFiles);
                            }
                        });
                    }
                }
            }

            attachItem.addEventListener('click', (event) => {
                const { target } = event;

                if (target.closest('[data-attach-remove]') || target.hasAttribute('data-attach-remove')) {
                    const targetFile = target.closest('[data-attach-file]');
                    const fileId = targetFile.getAttribute('data-id');
                    const fileName = targetFile.getAttribute('data-name');

                    removeFileFromFileList(attachInput, fileId, fileName);

                    uploadedFiles = getNewFileList(attachInput);

                    targetFile.remove();
                    attachItem.classList.remove('is-max-files', 'is-hidden');
                }
            });
        });
    }
}
