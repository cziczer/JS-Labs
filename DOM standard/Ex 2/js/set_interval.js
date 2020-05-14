function doPointlessComputationWithSetInterval(timeStart) {
    index = 0;
  
    function testCandidateInterval() {
      // finishing condition
      if (index == iterations) {
        pointlessComputationsButton.disabled = false;
        window.clearInterval(id);
        let timeEnd = performance.now();
        addResultToChart(mainChart, "interval", timeEnd - timeStart);
        return;
      }
      // test this number
      var candidate = index * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
          // not prime
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        primes.push(candidate);
      }
  
      index++;
    }
  
    var primes = [];
    var id = window.setInterval(testCandidateInterval, 50);
  }