[Javascript] 処理中表示システム : Processing or Loading
===
```
Create : 2025-02-09
Author : Yugeta.Koji
```

# Summary
- データベース問い合わせ、データpost、Loadingなどの、読み込み中の際に画面の他のリンクをクリックさせないための仕組み。
- 画面がフリーズしているように見えることを回避するための、視覚処理。
- 経過時間（秒）を更新することも可能。
- 任意秒数をloading表示することも可能。
- 処理中表示は、1画面に1つのみしか表示できません。（後発処理の時に表示されている場合は、一旦先発を削除します）


# Howto
1. Javascriptでモジュールの読み込み
> import { Pricessing } from "../mynt_proceccing/processing.js"

2. インスタンス作成
```
options = {
  status   : "start" or "processing" or "end" or null
  message  : "Processing...",
  style    : "style属性を記述できる",
}
const pricessing = new Processing(options)
```

3. 読み込み中の更新(rate更新)
```
new Processing().update(50)  // *%
```

4. 読み込み完了
```
new Processing().end(callback処理)
```
- callback処理は、無くても大丈夫。


# Demo
> http://localhost/api/mynt_processing/sample.html


# Technich
- cssの読み込み完了していないでstartすると、プログレスバーが正常に進まないので、大元のhtml-head内にてcssのみ読み込ませておくと、比較的処理しやすい。
