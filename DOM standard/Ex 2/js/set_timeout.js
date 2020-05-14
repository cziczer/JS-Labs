function doPointlessComputationWithSetTimeout(timeStart) {
    function testCandidateTimeout(index) {
      // finishing condition
      if (index == iterations) {
        pointlessComputationsButton.disabled = false;
        timeEnd = performance.now();
        addResultToChart(mainChart, "timeout", timeEnd - timeStart);
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
      // schedule the next
      var testFunction = testCandidateTimeout.bind(this, index + 1);
      window.setTimeout(testFunction, 50);
    }
  
    var primes = [];
    var testFunction = testCandidateTimeout.bind(this, 0);
    window.setTimeout(testFunction, 50);
  }