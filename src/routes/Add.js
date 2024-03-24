import { Component } from "../core/JStestCore";
import { dbService } from "../store/storeData";
import generateNewId from "../utils/generateNewId";
export default class Add extends Component {
  constructor() {
    super();
    this.tempData = null;
  }

  render() {
    this.el.classList.add("container", "add");
    this.tempData = {
      Id: generateNewId(),
      Photo: null,
      Name: null,
      Family: null,
      Planet: null,
      Division: null,
      Overview: null,
    };
    // 새로운 아이디 생성
    this.el.innerHTML = /*html*/ `
      <div class="employee-info add-title">Add Profile</div>
        <div class="employee-info add">
          <textarea id="idInput-add" disabled>${this.tempData.Id}</textarea>
          <textarea id="photoInput-add" placeholder="Copy PHOTO url"></textarea>
          <textarea id="nameInput-add" placeholder="your NAME"></textarea>
          <textarea id="familyInput-add" placeholder="your FAMILY"></textarea>
          <textarea id="planetInput-add" placeholder="PLANET you live on"></textarea>
          <textarea id="divisionInput-add" placeholder="DIVISION you are working in"></textarea>
          <textarea id="overviewInput-add" placeholder="OVERVIEW"></textarea>
        </div>
      </div>
      <div class="btn-area">
        <div class="submit-and-reset-area">
          <button id="cancelBtn">Cancel</button>
          <button type="reset" id="resetBtn-add">Reset</button>
          <button type="submit" class="reset" id="submitBtn-add">Submit</button>
        </div>
      </div>
    `;

    // textarea 높이 자동 조절
    function autoHeight(textarea) {
      textarea.style.height = "auto"; // 기본 높이로 설정
      textarea.style.height = textarea.scrollHeight + "px"; // scrollHeight로 내용의 높이를 계산하여 설정
    }


    const textareas = document.querySelectorAll(
      "#photoInput-add, #overviewInput-add"
    );
    textareas.forEach((textarea) => {
      textarea.addEventListener("input", () => {
        autoHeight(textarea);
      });
    });

    textareas.forEach((textarea) => {
      autoHeight(textarea);
    });

    setTimeout(() => {
      // 입력된 내용을 임시 저장하는 함수
      const saveNewData = () => {
        this.tempData = {
          Id: generateNewId(),
          Photo: document.getElementById("photoInput-add").value,
          Name: document.getElementById("nameInput-add").value,
          Family: document.getElementById("familyInput-add").value,
          Planet: document.getElementById("planetInput-add").value,
          Division: document.getElementById("divisionInput-add").value,
          Overview: document.getElementById("overviewInput-add").value,
        };
      };

      //내용이 변경될 때마다 임시 데이터 저장
      const changeData = document.querySelectorAll("textarea");
      changeData.forEach((changeData) => {
        changeData.addEventListener("change", saveNewData);
      });

      // Submit 버튼 클릭 시 임시 데이터를 로컬 스토리지에 저장 후 페이지 새로고침
      document.getElementById("submitBtn-add").addEventListener("click", () => {
        if (!this.tempData) {
          alert("직원 정보를 입력해주세요.");
          return;
        }
        if (
          !this.tempData.Photo ||
          !this.tempData.Name ||
          !this.tempData.Family ||
          !this.tempData.Planet ||
          !this.tempData.Division ||
          !this.tempData.Overview
        ) {
          alert("직원 정보를 빠짐없이 입력해주세요.");
          return;
        }

        if (confirm("이대로 추가하시겠습니까?")) {
          console.log(this.tempData);

          try {
            dbService.addData(this.tempData);

            this.tempData = null;

            alert("추가 완료!");
            window.location.href = "#/";
          } catch (error) {
            console.error("Add error:", error);
            alert("직원 등록에 실패했습니다.");
          }
        }
      });

      // 작성 내용 초기화(새로고침)
      document.getElementById("resetBtn-add").addEventListener("click", () => {
        // 각 input 요소의 값을 빈 문자열로 설정하여 초기화합니다.
        document.getElementById("photoInput-add").value = "";
        document.getElementById("nameInput-add").value = "";
        document.getElementById("familyInput-add").value = "";
        document.getElementById("planetInput-add").value = "";
        document.getElementById("divisionInput-add").value = "";
        document.getElementById("overviewInput-add").value = "";
      });

      // 취소 버튼 클릭 시 메인 페이지로 이동
      document.getElementById("cancelBtn").addEventListener("click", () => {
        if (confirm("취소하시겠습니까?")) {
          window.location.href = "#/";
        }
      });
    }, 100);
  }
}

