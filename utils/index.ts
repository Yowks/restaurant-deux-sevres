export function average(nums: number[]) {
  if(nums.length) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
  }
  return 0;
}
