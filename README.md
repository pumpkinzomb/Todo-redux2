`TodoList-redux2`
=============

React, Redux 7번째 실습
-------------

redux 개념잡기용으로 만들었던 기존의 [TodoList-redux](https://github.com/pumpkinzomb/TodoList-redux)에 
로그인 기능을 구현하기 위해 기존에 작성했던 action과 reducer를 싹다 뒤집어 엎었다.
간단한 기능이라 어렵지 않을거라 생각했었는데, 생각보다 복잡해서 여러 곳에서 헤맸던 거 같다.
그러나 velopert님의 memopad를 만들었던 경험이 여러가지로 도움이 많이 되었다.

결과물 : [Todolist-redux2 (Authentication ver.)](https://todolist-redux2.herokuapp.com/)
<br>
<br>
<br>

사용한 노드 플러그인<br>
-------------

1. 서버
* express
* body-parser
* mongoose
* path
* bcrypt

2. 클라이언트
* react
* react-dom
* react-redux
* react-addons-update
* redux-thunk
* react-app-polyfill
* axios
* font-awesome

3. 기타
* nodemon
* concurrently


느낀점 or 특이사항<br>
-------------

1. memopad 앱을 구현할때 사용했었던 Materializecss 프레임워크를 사용하지않고 직접 구현해보았다.
2. redux에 관해서 한층 더 심도 깊은 이해를 할 수 있게되었다.
3. 이번 heroku production에서는 package.json의 build가 heroku-postbuild와 충돌하여 build가 안되는 이슈가 있었다. 
(이유는 모르겠음. 메모패드때에는 이상없었다. 결국 package.json의 build를 react-build로 이름변경하여 수정함)
4. 깃허브의 gh-page를 이용해보려고했는데, build production은 잘되지만 api를 불러오는 부분에서 문제가 생기는 듯했다.
(결국 heroku로 빌드함...)