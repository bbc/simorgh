/*
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Safari 10.1 supports modules, but does not support the `nomodule` attribute - it will
 * load <script nomodule> anyway. This snippet solve this problem, but only for script
 * tags that load external code, e.g.: <script nomodule src="nomodule.js"></script>
 *
 * Again: this will **not** prevent inline script, e.g.:
 * <script nomodule>alert('no modules');</script>.
 *
 * This workaround is possible because Safari supports the non-standard 'beforeload' event.
 * This allows us to trap the module and nomodule load.
 *
 * Note also that `nomodule` is supported in later versions of Safari - it's just 10.1 that
 * omits this attribute.
 */
(() => {
  const check = document.createElement('script');
  if (!('noModule' in check) && 'onbeforeload' in check) {
    let support = false;
    document.addEventListener(
      'beforeload',
      e => {
        if (e.target === check) {
          support = true;
        } else if (!e.target.hasAttribute('nomodule') || !support) {
          return;
        }
        e.preventDefault();
      },
      true,
    );

    check.type = 'module';
    check.src = '.';
    document.head.appendChild(check);
    check.remove();
  }
})();
