function generateReceipt() {
  let name = document.getElementById("name").value;
  let amount = document.getElementById("amount").value;
  let desc = document.getElementById("desc").value;

  if (!name || !amount || !desc) {
    alert("Please fill all fields");
    return;
  }

  // store data in browser memory
  localStorage.setItem("name", name);
  localStorage.setItem("amount", amount);
  localStorage.setItem("desc", desc);

  // go to receipt page
  window.location.href = "receipt.html";
}


// load receipt data on second page
window.onload = function () {
  let name = localStorage.getItem("name");
  let amount = localStorage.getItem("amount");
  let desc = localStorage.getItem("desc");

  let txnId = "TXN" + Math.floor(Math.random() * 99999999);

  let output = `
    <p><b>Transaction ID:</b> ${txnId}</p>
    <p><b>Sender:</b> ${name} </p>
    <p><b>Receiver:</b> Akinola Olukitibi</p>
    <p><b>Amount:</b> ₦${amount}</p>
    <p><b>Description:</b> ${desc}</p>
    <p><b>Date:</b> ${new Date().toLocaleString()}</p>
  `;

  let box = document.getElementById("slipData");
  if (box) {
    box.innerHTML = output;
  }
};

async function shareReceiptImage() {

    const receipt = document.getElementById("receiptCard");

    try {

        const canvas = await html2canvas(receipt);

        canvas.toBlob(async function(blob) {

            const file = new File(
                [blob],
                "transaction-receipt.png",
                { type: "image/png" }
            );

            if (
                navigator.canShare &&
                navigator.canShare({ files: [file] })
            ) {

                await navigator.share({
                    title: "Transaction Receipt",
                    text: "Payment Receipt",
                    files: [file]
                });

            } else {

                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "transaction-receipt.png";
                link.click();

                alert("Sharing not supported. Receipt downloaded instead.");
            }

        });

    } catch (error) {

        console.error(error);
        alert("Unable to share receipt.");
    }
}