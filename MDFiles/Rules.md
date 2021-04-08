# RULES
---
<h1 class="orange">Task Management</h1>

>Manager create new Meeting.  
>Meeting下面帶有數個Task準備討論認領。  
>Manager在meeting中解釋各Task的目標成果為何。  

<h1 class="orange">Task Evaluation (each member)</h1>

>針對某一個Task, 開始作評分  
>必須在meeting中立刻投票，防止member彼此間討論串供(集體把工時拉長)  
>投票為秘密投票，不可互相討論。  
>Task Vote的最終結果只有Manager知道，作成統計圖後，選擇性公開部分數據  
>Task Vote的最終結果作為預估工時的依據之一，並非全部，還要加上Manager的考量，以及私下與RD的溝通(了解難處，協助突破瓶頸)，才會形成最終的工時預估值  

>以上都會作成Statistic，不公布個人的數值，只公布母體的統計值  

>each member有專屬個人指標，作為日後績效指標的參考依據之一(鼓勵有企圖心，願意挑戰的member):  
>- 預估工時排名   
>- 預估難度排名  

>Task會分類為 1.前端 2.後端 3.其他(全端)  
>each member根據自己的專長作投票，前端RD不需要Vote後端的Task，硬要投也是可以，會留下投票紀錄，但是在Statistic圖上可能不予採計  

>大家會看到Statistic圖上的統計數字，只有整體統計結果，不會顯示個人紀錄  

<style>
    .lime{
        color:lime;
    }
    .yellow{
        color:yellow;
    }
    .orange{
        color:orange;
    }
</style>

>Task Evaluation主要評估下面三點:
><h3 class="yellow">1.有做過類似功能 (Checkbox):</h3>  

>>過去是否作過類似功能  

><h3 class="yellow">2.難度指數 (1⭐ - 5⭐):</h3>

>>覺得Task的困難程度  

><h3 class="yellow">3.完成預估天數-DEV階段(Slider-最細到Hour):</h3>

>><span class="lime">DEV</span>階段，完成標準為功能性驗證，沒有明顯Bug，不看unit test  
Code Refactoring Time Ratio(CRTR)目前先訂為20%，意思是，若原本DEV階段需要10小時完成，則另外花費2小時讓RD作Code Refactoring(含提升unit test)  
<span class="lime">CR-1</span>階段，根據CRTR，此時RD工時為2小時，進入SIT系統整合測試階段，並在這期間把unit test coverage拉高到40%  
<span class="lime">CR-2</span>階段，根據CRTR，此時RD工時為2小時，系統進入UAT使用者驗收階段，再給RD 2小時，做最後調整，並把unit test coverage拉高到70%  

<h1 class="orange">Task Acception (each member)</h1>

>指定一個時間(ex: 18:00)，大家各自認領工作(先搶先贏)，若工作無人認領，則由Manager分配  
>>1.亂數選取 (沒有⭐)  
>>2.直接分派 (沒有⭐)  
>>3.Manager評定該Task，給予Task Star⭐數目(1⭐ - 5⭐)，主動認領並在期限內完成者，可獲得Task Star⭐  
>若遇到特殊緊急情況，例如:專案非常急迫，需要馬上完成，Manager可使用最低工時標準，看是哪一個member提出最低工時，直接Assign Task(不建議使用此方法，一年只能用一次)
>>個人可累積Task Star⭐，顯示在自己的Task Vote系統首頁上，0則不顯示⭐圖案  
>>Task Star⭐在績效考核時，是極度重要指標，影響到績效獎金分紅，以及升遷順序  
>>以hTC為例，分內事情作好，不算績效，要超出Manager的期望，才算是績效(be outstanding)  
每個星星任務Descripiton會註明，是因為甚麼事情獲得此次任務星星
生涯集滿⭐100個，公司頒發水晶獎座，表彰貢獻(上面標明平均員工⭐數，此次個人獲得⭐數)  
![](imgs/starPrice1.png)  
生涯集滿⭐200個，公司頒發??  
⭐越難取得，價值越顯珍貴  
⭐表彰的是RD部門`年度整體績效獎金`的第一優先分配權，暫定NT$ 2000/⭐  
RD部門`年度整體績效獎金`的數字在年度結束後，由老闆決定，若公司賺的錢不多，也可能是0  
⭐代表的是榮譽、個人職涯紀錄，以及實際收益  
⭐每年度開始重新歸零計算  

taskvote可幫助管理者了解team member的長處及短處，
日後若有新案子要簽約時，我們評估自己的人力成本、花費時間會更為精準

預估天數(長條圖) + 中位數  
難度指數(star ranking) + 中位數  
有做過類似功能(長條圖-有15  沒有20)  