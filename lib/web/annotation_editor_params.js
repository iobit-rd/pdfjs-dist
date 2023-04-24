/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2023 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * JavaScript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationEditorParams = void 0;
var _pdf = require("../pdf");
class AnnotationEditorParams {
  constructor(options, eventBus) {
    this.eventBus = eventBus;
    this.#bindListeners(options);
  }
  #bindListeners({
    editorFreeTextFontSize,
    editorFreeTextColor,
    editorInkColor,
    editorInkThickness,
    editorInkOpacity
  }) {
    const dispatchEvent = (typeStr, value) => {
      this.eventBus.dispatch("switchannotationeditorparams", {
        source: this,
        type: _pdf.AnnotationEditorParamsType[typeStr],
        value
      });
    };
    editorFreeTextFontSize.addEventListener("input", function () {
      dispatchEvent("FREETEXT_SIZE", this.valueAsNumber);
    });
    editorFreeTextColor.addEventListener("input", function () {
      dispatchEvent("FREETEXT_COLOR", this.value);
    });
    editorInkColor.addEventListener("input", function () {
      dispatchEvent("INK_COLOR", this.value);
    });
    editorInkThickness.addEventListener("input", function () {
      dispatchEvent("INK_THICKNESS", this.valueAsNumber);
    });
    editorInkOpacity.addEventListener("input", function () {
      dispatchEvent("INK_OPACITY", this.valueAsNumber);
    });
    this.eventBus._on("annotationeditorparamschanged", evt => {
      for (const [type, value] of evt.details) {
        switch (type) {
          case _pdf.AnnotationEditorParamsType.FREETEXT_SIZE:
            editorFreeTextFontSize.value = value;
            break;
          case _pdf.AnnotationEditorParamsType.FREETEXT_COLOR:
            editorFreeTextColor.value = value;
            break;
          case _pdf.AnnotationEditorParamsType.INK_COLOR:
            editorInkColor.value = value;
            break;
          case _pdf.AnnotationEditorParamsType.INK_THICKNESS:
            editorInkThickness.value = value;
            break;
          case _pdf.AnnotationEditorParamsType.INK_OPACITY:
            editorInkOpacity.value = value;
            break;
        }
      }
    });
  }
}
exports.AnnotationEditorParams = AnnotationEditorParams;